// Client-Side Image Downscaler and Optimizer
// Downscales high-resolution camera photos (e.g., 5-15MB) into lightweight JPEGs (~150-350KB)
// while preserving crystal-clear detail for pet embroidery references.

export async function downscaleImage(fileOrBlob, maxWidth = 1600, maxHeight = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const originalSize = fileOrBlob.size;
    const fileName = fileOrBlob.name || 'pet_photo.jpg';

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image for resizing'));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        let targetWidth = width;
        let targetHeight = height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          targetWidth = Math.round(width * ratio);
          targetHeight = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Canvas to Blob conversion failed'));
            }

            const cleanFileName = fileName.replace(/\.[^/.]+$/, "") + ".jpg";
            const downscaledFile = new File([blob], cleanFileName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });

            const previewUrl = URL.createObjectURL(blob);

            resolve({
              file: downscaledFile,
              blob: blob,
              previewUrl: previewUrl,
              fileName: cleanFileName,
              originalSize: originalSize,
              downscaledSize: blob.size,
              width: targetWidth,
              height: targetHeight
            });
          },
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(fileOrBlob);
  });
}

// Convert a base64 Data URL to a File
export function dataUrlToFile(dataUrl, fileName = 'custom_keepsake_preview.jpg') {
  const arr = dataUrl.split(',');
  const mime = (arr[0].match(/:(.*?);/) || [])[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

// Format bytes into human readable KB / MB
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
