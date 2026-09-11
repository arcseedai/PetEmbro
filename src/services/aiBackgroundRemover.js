// Lightweight AI Background Removal Service using Google MediaPipe
// Uses ~2.7 MB DeepLabV3 (trained on cats, dogs, pets) running on CPU WebAssembly

import { FilesetResolver, ImageSegmenter } from '@mediapipe/tasks-vision';

let segmenterPromise = null;
const cutoutCache = new Map();

function getBasePath() {
  if (typeof window === 'undefined') return '';
  const cleanHref = window.location.href.split('#')[0].split('?')[0];
  return cleanHref.endsWith('/') ? cleanHref : cleanHref.substring(0, cleanHref.lastIndexOf('/') + 1);
}

async function getSegmenter(onProgress) {
  if (segmenterPromise) return segmenterPromise;

  segmenterPromise = (async () => {
    const basePath = getBasePath();
    const wasmPath = new URL('wasm', basePath).href;
    const modelPath = new URL('models/deeplab_v3.tflite', basePath).href;

    if (onProgress) onProgress('Loading lightweight engine...', 25);
    let vision;
    try {
      vision = await FilesetResolver.forVisionTasks(wasmPath);
    } catch (err) {
      console.warn('Local wasm failed, trying CDN fallback:', err);
      vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm');
    }
    
    if (onProgress) onProgress('Loading pet model (2.7 MB)...', 55);
    let segmenter;
    try {
      segmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: 'CPU'
        },
        runningMode: 'IMAGE',
        outputCategoryMask: true,
        outputConfidenceMasks: false
      });
    } catch (err) {
      console.warn('Local model failed, trying Google CDN fallback:', err);
      segmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/image_segmenter/deeplab_v3/float32/1/deeplab_v3.tflite',
          delegate: 'CPU'
        },
        runningMode: 'IMAGE',
        outputCategoryMask: true,
        outputConfidenceMasks: false
      });
    }
    return segmenter;
  })();

  return segmenterPromise;
}

/**
 * Core segmentation: returns both the cutout image and the raw mask canvas
 * @param {HTMLImageElement} imageElement 
 * @param {Function} onProgress 
 * @returns {Promise<{ cutoutImg: HTMLImageElement, maskCanvas: HTMLCanvasElement }>}
 */
export async function getAiSegmentedData(imageElement, onProgress = null) {
  if (!imageElement || !imageElement.complete) return null;

  const cacheKey = imageElement.src;
  if (cutoutCache.has(cacheKey)) {
    return cutoutCache.get(cacheKey);
  }

  try {
    const segmenter = await getSegmenter(onProgress);

    if (onProgress) onProgress('Isolating pet subject...', 80);

    // Segment the image using MediaPipe
    const result = segmenter.segment(imageElement);
    const mask = result.categoryMask;

    if (!mask) {
      console.warn('MediaPipe returned no mask, using original image');
      const dummyMask = document.createElement('canvas');
      dummyMask.width = imageElement.naturalWidth || imageElement.width;
      dummyMask.height = imageElement.naturalHeight || imageElement.height;
      const dCtx = dummyMask.getContext('2d');
      dCtx.fillStyle = '#ffffff';
      dCtx.fillRect(0, 0, dummyMask.width, dummyMask.height);
      return { cutoutImg: imageElement, maskCanvas: dummyMask };
    }

    const maskWidth = mask.width;
    const maskHeight = mask.height;
    const maskData = mask.getAsUint8Array();

    // Create mask canvas at source image dimensions
    const rawMaskCanvas = document.createElement('canvas');
    rawMaskCanvas.width = maskWidth;
    rawMaskCanvas.height = maskHeight;
    const rawMaskCtx = rawMaskCanvas.getContext('2d');
    const maskImgData = rawMaskCtx.createImageData(maskWidth, maskHeight);
    const mData = maskImgData.data;

    let foregroundCount = 0;
    for (let i = 0; i < maskData.length; i++) {
      const category = maskData[i];
      const pixelIdx = i * 4;
      // Category 0 is background; > 0 is foreground (cat, dog, person, etc.)
      if (category > 0) {
        mData[pixelIdx] = 255;
        mData[pixelIdx + 1] = 255;
        mData[pixelIdx + 2] = 255;
        mData[pixelIdx + 3] = 255;
        foregroundCount++;
      } else {
        mData[pixelIdx + 3] = 0;
      }
    }
    rawMaskCtx.putImageData(maskImgData, 0, 0);

    // Clean up MPMask WASM memory
    mask.close();

    // Scale mask to exact original image dimensions
    const imgW = imageElement.naturalWidth || imageElement.width;
    const imgH = imageElement.naturalHeight || imageElement.height;
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = imgW;
    maskCanvas.height = imgH;
    const maskCtx = maskCanvas.getContext('2d');
    maskCtx.drawImage(rawMaskCanvas, 0, 0, imgW, imgH);

    // If no foreground was detected at all, fill white (keep all)
    if (foregroundCount < 10) {
      console.warn('No pet subject detected by model, falling back to full image');
      maskCtx.fillStyle = '#ffffff';
      maskCtx.fillRect(0, 0, imgW, imgH);
    }

    const cutoutImg = await createCutoutFromMask(imageElement, maskCanvas);
    const data = { cutoutImg, maskCanvas };
    cutoutCache.set(cacheKey, data);

    if (onProgress) onProgress('Ready!', 100);
    return data;
  } catch (err) {
    console.error('MediaPipe background removal error:', err);
    throw err;
  }
}

/**
 * Composite the source image with a binary mask canvas
 * @param {HTMLImageElement} imageElement 
 * @param {HTMLCanvasElement} maskCanvas 
 * @returns {Promise<HTMLImageElement>}
 */
export async function createCutoutFromMask(imageElement, maskCanvas) {
  const w = imageElement.naturalWidth || imageElement.width;
  const h = imageElement.naturalHeight || imageElement.height;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = w;
  outCanvas.height = h;
  const outCtx = outCanvas.getContext('2d');

  // Draw mask
  outCtx.drawImage(maskCanvas, 0, 0, w, h);
  // Source-in: keeps only original image pixels where mask is opaque
  outCtx.globalCompositeOperation = 'source-in';
  outCtx.drawImage(imageElement, 0, 0, w, h);

  const blobUrl = outCanvas.toDataURL('image/png');
  const cutoutImg = new Image();
  cutoutImg.crossOrigin = 'anonymous';

  await new Promise((resolve, reject) => {
    cutoutImg.onload = resolve;
    cutoutImg.onerror = reject;
    cutoutImg.src = blobUrl;
  });

  return cutoutImg;
}

/**
 * Convenience function returning just the cutout image
 * @param {HTMLImageElement} imageElement 
 * @param {Function} onProgress 
 * @returns {Promise<HTMLImageElement>}
 */
export async function getAiSegmentedImage(imageElement, onProgress = null) {
  const data = await getAiSegmentedData(imageElement, onProgress);
  return data ? data.cutoutImg : imageElement;
}
