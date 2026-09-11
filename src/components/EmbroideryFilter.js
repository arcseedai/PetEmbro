// Embroidery Filter & Background Isolation Engine
// Fully customizable with real-time tuning for size, thickness, strength, blend, shadows, and sheen

export class EmbroideryFilterEngine {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    // Curated DMC Embroidery Floss Palette (Real stranded cotton colors with full tonal range)
    this.dmcPalette = [
      // True Blacks & Deep Shadows
      [15, 15, 15], [30, 25, 25], [45, 35, 30],
      // Deep Browns & Chocolates
      [65, 38, 20], [90, 52, 26], [120, 75, 40], [145, 85, 45],
      // Rich Warm Tans & Caramel
      [175, 115, 60], [200, 140, 75], [225, 170, 100], [240, 195, 135],
      // Vivid Gingers, Rust & Auburn
      [160, 60, 20], [195, 85, 30], [220, 110, 40], [235, 140, 55],
      // Golds & Yellows
      [215, 160, 40], [240, 190, 60], [250, 215, 100], [255, 235, 150],
      // Pure Whites & Creams
      [255, 255, 255], [248, 245, 238], [238, 230, 215], [220, 210, 195],
      // Neutral & Charcoal Greys
      [60, 60, 65], [105, 105, 110], [155, 155, 160], [200, 200, 205],
      // Pinks, Rose & Tongues/Noses
      [140, 45, 55], [190, 80, 95], [230, 130, 145], [250, 185, 195],
      // Blues & Navies (eyes, collars, accessories)
      [20, 35, 80], [45, 80, 150], [90, 140, 210], [160, 200, 240],
      // Greens (eyes, outdoor collars)
      [30, 90, 50], [60, 140, 75], [120, 185, 95], [175, 215, 130]
    ];
  }

  nearestDMCColor(r, g, b) {
    let minDistance = Infinity;
    let best = this.dmcPalette[0];
    for (let i = 0; i < this.dmcPalette.length; i++) {
      const c = this.dmcPalette[i];
      // Weighted color distance for human perception (red: 0.3, green: 0.59, blue: 0.11)
      const dist = 0.3 * (r - c[0]) ** 2 + 0.59 * (g - c[1]) ** 2 + 0.11 * (b - c[2]) ** 2;
      if (dist < minDistance) {
        minDistance = dist;
        best = c;
      }
    }
    return best;
  }

  processImage(sourceImage, options = {}) {
    const {
      zoom = 1.0,
      offsetX = 0,
      offsetY = 0,
      removeBg = true,
      bgTolerance = 35,
      filterMode = 'cross', // 'cross', 'fur', 'photo'
      gridSize = 14,
      threadThickness = 3.2,
      stitchStrength = 0.95,
      photoBlend = 0.20,
      shadowStrength = 0.40,
      sheenStrength = 0.45,
      colorQuantize = 80, // 0 to 100%
      fabricWeaveStrength = 0.40,
      furLength = 12,
      furAngle = 0.4,
      tentAngle = 45
    } = options;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    // 1. Render source image with Pan, Zoom & Mirrored Edge Wrapping
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    // Keep transparent so AI cutout alpha is strictly preserved

    const imgAspect = sourceImage.width / sourceImage.height;
    let drawW, drawH;
    if (imgAspect > 1) {
      drawH = h * zoom;
      drawW = drawH * imgAspect;
    } else {
      drawW = w * zoom;
      drawH = drawW / imgAspect;
    }
    const drawX = (w - drawW) / 2 + offsetX;
    const drawY = (h - drawH) / 2 + offsetY;

    tempCtx.drawImage(sourceImage, drawX, drawY, drawW, drawH);
    if (!removeBg) {
      this.drawMirroredWraps(tempCtx, sourceImage, drawX, drawY, drawW, drawH, w, h);
    }

    const centerX = w / 2;
    const centerY = h / 2;
    const maxRadius = w * 0.44;

    const imgData = tempCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Check if image already has transparent cutout alpha (from AI segmentation)
    let hasCutoutAlpha = false;
    for (let i = 3; i < data.length; i += 200) {
      if (data[i] < 30) {
        hasCutoutAlpha = true;
        break;
      }
    }

    // Background color detection (used as fallback only when image has no alpha cutout)
    const cornerSamples = [
      [data[0], data[1], data[2]],
      [data[(w - 1) * 4], data[(w - 1) * 4 + 1], data[(w - 1) * 4 + 2]],
      [data[(h - 1) * w * 4], data[(h - 1) * w * 4 + 1], data[(h - 1) * w * 4 + 2]],
      [data[((h - 1) * w + (w - 1)) * 4], data[((h - 1) * w + (w - 1)) * 4 + 1], data[((h - 1) * w + (w - 1)) * 4 + 2]]
    ];
    const avgBgR = (cornerSamples[0][0] + cornerSamples[1][0] + cornerSamples[2][0] + cornerSamples[3][0]) / 4;
    const avgBgG = (cornerSamples[0][1] + cornerSamples[1][1] + cornerSamples[2][1] + cornerSamples[3][1]) / 4;
    const avgBgB = (cornerSamples[0][2] + cornerSamples[1][2] + cornerSamples[2][2] + cornerSamples[3][2]) / 4;

    // 2. IF ORIGINAL PHOTO MODE: Render pure photo with background cutout on clean linen
    if (filterMode === 'photo') {
      ctx.fillStyle = '#FAF6F0';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(tempCanvas, 0, 0, w, h);
      return this.canvas;
    }

    // 3. Draw base linen fabric (only for embroidery modes)
    ctx.fillStyle = '#FAF6F0';
    ctx.fillRect(0, 0, w, h);

    if (fabricWeaveStrength > 0.05) {
      this.drawLinenWeave(ctx, w, h, fabricWeaveStrength);
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
    ctx.clip();

    // Photo underlay blend (rich underlay support to prevent pale linen bleaching)
    if (photoBlend > 0.01) {
      ctx.save();
      ctx.globalAlpha = Math.min(1.0, photoBlend);
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.restore();
    }

    // 4. Render selected embroidery filter mode
    if (filterMode === 'cross') {
      this.renderRealisticCrossStitch(ctx, data, w, h, centerX, centerY, maxRadius, gridSize, threadThickness, stitchStrength, shadowStrength, sheenStrength, colorQuantize, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, fabricWeaveStrength, hasCutoutAlpha);
    } else if (filterMode === 'tent') {
      this.renderNeedlepointTent(ctx, data, w, h, centerX, centerY, maxRadius, gridSize, threadThickness, stitchStrength, shadowStrength, sheenStrength, colorQuantize, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, tentAngle, hasCutoutAlpha);
    } else {
      this.renderThreadPainting(ctx, data, w, h, centerX, centerY, maxRadius, furLength, furAngle, threadThickness, stitchStrength, shadowStrength, sheenStrength, colorQuantize, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, hasCutoutAlpha);
    }

    ctx.restore();
    return this.canvas;
  }

  // Color Quantization & DMC Palette Stepping
  quantizeColor(r, g, b, quantizePct) {
    if (quantizePct <= 2) {
      return [r, g, b];
    }
    const q = quantizePct / 100;
    const levels = Math.max(4, Math.round(32 - q * 26));
    const step = 255 / (levels - 1);
    const qr = Math.round(Math.round(r / step) * step);
    const qg = Math.round(Math.round(g / step) * step);
    const qb = Math.round(Math.round(b / step) * step);

    const [dmcR, dmcG, dmcB] = this.nearestDMCColor(qr, qg, qb);
    return [
      Math.round(r * (1 - q) + dmcR * q),
      Math.round(g * (1 - q) + dmcG * q),
      Math.round(b * (1 - q) + dmcB * q)
    ];
  }

  // 8-Way Mirrored Edge Wrapping
  drawMirroredWraps(ctx, img, dx, dy, dw, dh, canvasW, canvasH) {
    if (dx > 0) {
      ctx.save(); ctx.translate(dx, dy); ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dx + dw < canvasW) {
      ctx.save(); ctx.translate(dx + 2 * dw, dy); ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dy > 0) {
      ctx.save(); ctx.translate(dx, dy); ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dy + dh < canvasH) {
      ctx.save(); ctx.translate(dx, dy + 2 * dh); ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dx > 0 && dy > 0) {
      ctx.save(); ctx.translate(dx, dy); ctx.scale(-1, -1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dx + dw < canvasW && dy > 0) {
      ctx.save(); ctx.translate(dx + 2 * dw, dy); ctx.scale(-1, -1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dx > 0 && dy + dh < canvasH) {
      ctx.save(); ctx.translate(dx, dy + 2 * dh); ctx.scale(-1, -1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
    if (dx + dw < canvasW && dy + dh < canvasH) {
      ctx.save(); ctx.translate(dx + 2 * dw, dy + 2 * dh); ctx.scale(-1, -1);
      ctx.drawImage(img, 0, 0, dw, dh); ctx.restore();
    }
  }

  // Authentic Handcrafted Cross-Stitch (Layered 2-Pass with Plump Floss & Overlapping Cross Knots)
  renderRealisticCrossStitch(ctx, data, w, h, centerX, centerY, maxRadius, cellSize, thickness, strength, shadowStr, sheenStr, quantizePct, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, fabricWeaveStrength = 0, hasCutoutAlpha = false) {
    const half = cellSize / 2;
    const actualThick = Math.max(1.0, thickness);

    // Fabric needle holes (only when weave texture is enabled)
    if (fabricWeaveStrength > 0.05) {
      ctx.fillStyle = `rgba(160, 140, 120, ${fabricWeaveStrength * 0.25})`;
      for (let y = cellSize; y < h - cellSize; y += cellSize) {
        for (let x = cellSize; x < w - cellSize; x += cellSize) {
          const dx = x - centerX;
          const dy = y - centerY;
          if (Math.sqrt(dx * dx + dy * dy) < maxRadius - 2) {
            ctx.beginPath();
            ctx.arc(x, y, 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    ctx.globalAlpha = strength;

    // PASS 1: Draw ALL bottom stitches ( / ) across the entire hoop
    for (let y = cellSize; y < h - cellSize; y += cellSize) {
      for (let x = cellSize; x < w - cellSize; x += cellSize) {
        const cx = x + half;
        const cy = y + half;
        const dx = cx - centerX;
        const dy = cy - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius - 4) continue;

        const sampleIdx = (Math.floor(cy) * w + Math.floor(cx)) * 4;
        const r = data[sampleIdx];
        const g = data[sampleIdx + 1];
        const b = data[sampleIdx + 2];
        const a = data[sampleIdx + 3];
        if (a < 30) continue;

        if (removeBg && !hasCutoutAlpha) {
          const colorDist = Math.sqrt((r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2);
          if (colorDist < bgTolerance * 2.2 && dist > maxRadius * 0.35) continue;
        }

        const [finalR, finalG, finalB] = this.quantizeColor(r, g, b, quantizePct);
        this.drawCrossBottomLeg(ctx, x, y, cellSize, actualThick, finalR, finalG, finalB, shadowStr, sheenStr);
      }
    }

    // PASS 2: Draw ALL top stitches ( \ ) crossing OVER the bottom stitches with realistic contact occlusion
    for (let y = cellSize; y < h - cellSize; y += cellSize) {
      for (let x = cellSize; x < w - cellSize; x += cellSize) {
        const cx = x + half;
        const cy = y + half;
        const dx = cx - centerX;
        const dy = cy - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius - 4) continue;

        const sampleIdx = (Math.floor(cy) * w + Math.floor(cx)) * 4;
        const r = data[sampleIdx];
        const g = data[sampleIdx + 1];
        const b = data[sampleIdx + 2];
        const a = data[sampleIdx + 3];
        if (a < 30) continue;

        if (removeBg && !hasCutoutAlpha) {
          const colorDist = Math.sqrt((r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2);
          if (colorDist < bgTolerance * 2.2 && dist > maxRadius * 0.35) continue;
        }

        const [finalR, finalG, finalB] = this.quantizeColor(r, g, b, quantizePct);
        this.drawCrossTopLeg(ctx, x, y, cellSize, actualThick, finalR, finalG, finalB, shadowStr, sheenStr);
      }
    }

    ctx.globalAlpha = 1.0;
  }

  // Authentic Bottom Leg ( / )
  drawCrossBottomLeg(ctx, x, y, size, thickness, r, g, b, shadowStr, sheenStr) {
    const pad = 0.8;
    const x1 = x + pad;
    const y1 = y + size - pad;
    const x2 = x + size - pad;
    const y2 = y + pad;

    ctx.lineCap = 'round';

    // Drop shadow under bottom thread
    if (shadowStr > 0.05) {
      ctx.strokeStyle = `rgba(0, 0, 0, ${shadowStr * 0.35})`;
      ctx.lineWidth = thickness + 1.2;
      ctx.beginPath();
      ctx.moveTo(x1 + 0.4, y1 + 0.6);
      ctx.lineTo(x2 + 0.4, y2 + 0.6);
      ctx.stroke();
    }

    // Core plump thread body
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // 2-Ply Twisted Floss Strands: subtle twin-highlight along the diagonal
    if (sheenStr > 0.04) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${sheenStr * 0.35})`;
      ctx.lineWidth = Math.max(0.6, thickness * 0.22);
      ctx.beginPath();
      ctx.moveTo(x1 - 0.3, y1 - 0.3);
      ctx.lineTo(x2 - 0.3, y2 - 0.3);
      ctx.stroke();
    }
  }

  // Authentic Top Leg ( \ ) with crossing knot bulge & contact occlusion
  drawCrossTopLeg(ctx, x, y, size, thickness, r, g, b, shadowStr, sheenStr) {
    const pad = 0.8;
    const x1 = x + pad;
    const y1 = y + pad;
    const x2 = x + size - pad;
    const y2 = y + size - pad;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    ctx.lineCap = 'round';

    // Contact shadow cast by the top leg crossing OVER the bottom leg
    if (shadowStr > 0.04) {
      ctx.strokeStyle = `rgba(0, 0, 0, ${shadowStr * 0.55})`;
      ctx.lineWidth = thickness + 1.4;
      ctx.beginPath();
      ctx.moveTo(x1 + 0.5, y1 + 0.8);
      ctx.lineTo(x2 + 0.5, y2 + 0.8);
      ctx.stroke();
    }

    // Top thread core
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Central crossing knot bulge (authentic tactile 3D intersection where threads cross)
    const knotRadius = Math.max(0.9, thickness * 0.55);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc(midX, midY, knotRadius, 0, Math.PI * 2);
    ctx.fill();

    // Silk floss specular sheen along the top crossing thread
    if (sheenStr > 0.04) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${sheenStr * 0.45})`;
      ctx.lineWidth = Math.max(0.6, thickness * 0.22);
      ctx.beginPath();
      ctx.moveTo(x1 + 0.2, y1 - 0.2);
      ctx.lineTo(x2 + 0.2, y2 - 0.2);
      ctx.stroke();

      // Top knot highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${sheenStr * 0.5})`;
      ctx.beginPath();
      ctx.arc(midX - 0.3, midY - 0.3, knotRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Continental / Gobelin Tent Stitch (Needlepoint Tapestry Embroidery with Rotatable Stitches)
  renderNeedlepointTent(ctx, data, w, h, centerX, centerY, maxRadius, cellSize, thickness, strength, shadowStr, sheenStr, quantizePct, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, tentAngle = 45, hasCutoutAlpha = false) {
    const actualThick = Math.max(1.4, thickness * 1.35);
    ctx.globalAlpha = strength;
    ctx.lineCap = 'round';

    const rad = (tentAngle * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);
    const halfLen = (cellSize * 1.35) / 2;
    const dxStitch = halfLen * cosA;
    const dyStitch = halfLen * sinA;

    for (let y = cellSize; y < h - cellSize; y += cellSize) {
      for (let x = cellSize; x < w - cellSize; x += cellSize) {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const dx = cx - centerX;
        const dy = cy - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius - 4) continue;

        const sampleIdx = (Math.floor(cy) * w + Math.floor(cx)) * 4;
        const r = data[sampleIdx];
        const g = data[sampleIdx + 1];
        const b = data[sampleIdx + 2];
        const a = data[sampleIdx + 3];
        if (a < 30) continue;

        if (removeBg && !hasCutoutAlpha) {
          const colorDist = Math.sqrt((r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2);
          if (colorDist < bgTolerance * 2.2 && dist > maxRadius * 0.35) continue;
        }

        const [finalR, finalG, finalB] = this.quantizeColor(r, g, b, quantizePct);

        const x1 = cx - dxStitch;
        const y1 = cy + dyStitch;
        const x2 = cx + dxStitch;
        const y2 = cy - dyStitch;

        // Groove shadow between rows
        if (shadowStr > 0.05) {
          ctx.strokeStyle = `rgba(0, 0, 0, ${shadowStr * 0.45})`;
          ctx.lineWidth = actualThick + 1.2;
          ctx.beginPath();
          ctx.moveTo(x1 + 0.6, y1 + 0.6);
          ctx.lineTo(x2 + 0.6, y2 + 0.6);
          ctx.stroke();
        }

        // Main ribbed diagonal tapestry thread
        ctx.strokeStyle = `rgb(${finalR}, ${finalG}, ${finalB})`;
        ctx.lineWidth = actualThick;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Rib crest sheen
        if (sheenStr > 0.04) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${sheenStr * 0.35})`;
          ctx.lineWidth = Math.max(0.6, actualThick * 0.25);
          ctx.beginPath();
          ctx.moveTo(x1 - 0.3, y1 - 0.3);
          ctx.lineTo(x2 - 0.3, y2 - 0.3);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1.0;
  }

  // French Knot Embroidery (Tactile 3D Rosettes / Curly Fur Stitches)
  renderFrenchKnots(ctx, data, w, h, centerX, centerY, maxRadius, cellSize, thickness, strength, shadowStr, sheenStr, quantizePct, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, hasCutoutAlpha = false) {
    const knotRadius = Math.max(1.8, cellSize * 0.55);
    ctx.globalAlpha = strength;

    for (let y = cellSize; y < h - cellSize; y += cellSize) {
      for (let x = cellSize; x < w - cellSize; x += cellSize) {
        // Natural organic offset so knots look hand-stitched instead of mechanical
        const jitterX = (Math.sin(x * 9.1 + y * 3.7) * 0.25) * cellSize;
        const jitterY = (Math.cos(y * 8.3 + x * 4.1) * 0.25) * cellSize;
        const cx = x + cellSize / 2 + jitterX;
        const cy = y + cellSize / 2 + jitterY;
        const dx = cx - centerX;
        const dy = cy - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius - 4) continue;

        const sampleIdx = (Math.floor(cy) * w + Math.floor(cx)) * 4;
        const r = data[sampleIdx];
        const g = data[sampleIdx + 1];
        const b = data[sampleIdx + 2];
        const a = data[sampleIdx + 3];
        if (a < 30) continue;

        if (removeBg && !hasCutoutAlpha) {
          const colorDist = Math.sqrt((r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2);
          if (colorDist < bgTolerance * 2.2 && dist > maxRadius * 0.35) continue;
        }

        const [finalR, finalG, finalB] = this.quantizeColor(r, g, b, quantizePct);

        // Drop shadow under knot
        if (shadowStr > 0.05) {
          ctx.fillStyle = `rgba(0, 0, 0, ${shadowStr * 0.5})`;
          ctx.beginPath();
          ctx.arc(cx + 0.8, cy + 0.9, knotRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Knot rosette body
        ctx.fillStyle = `rgb(${finalR}, ${finalG}, ${finalB})`;
        ctx.beginPath();
        ctx.arc(cx, cy, knotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner coil spiral (thread wound around the needle)
        ctx.strokeStyle = `rgba(0, 0, 0, 0.22)`;
        ctx.lineWidth = Math.max(0.7, knotRadius * 0.3);
        ctx.beginPath();
        ctx.arc(cx, cy, knotRadius * 0.5, 0.3, Math.PI * 1.5);
        ctx.stroke();

        // Silk knot specular highlight
        if (sheenStr > 0.04) {
          ctx.fillStyle = `rgba(255, 255, 255, ${sheenStr * 0.55})`;
          ctx.beginPath();
          ctx.arc(cx - knotRadius * 0.3, cy - knotRadius * 0.3, knotRadius * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1.0;
  }

  // Fur Thread-Painting
  renderThreadPainting(ctx, data, w, h, centerX, centerY, maxRadius, len, angleMult, thickness, strength, shadowStr, sheenStr, quantizePct, removeBg, avgBgR, avgBgG, avgBgB, bgTolerance, hasCutoutAlpha = false) {
    const step = Math.max(4, Math.round(thickness * 1.8));
    ctx.globalAlpha = strength;

    for (let y = step; y < h - step; y += step) {
      for (let x = step; x < w - step; x += step) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius) continue;

        const idx = (y * w + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        if (a < 30) continue;

        if (removeBg && !hasCutoutAlpha) {
          const colorDist = Math.sqrt((r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2);
          if (colorDist < bgTolerance * 2.2 && dist > maxRadius * 0.35) continue;
        }

        let finalR = r, finalG = g, finalB = b;
        if (quantizePct > 2) {
          const q = quantizePct / 100;
          const levels = Math.max(4, Math.round(32 - q * 26));
          const step = 255 / (levels - 1);
          const qr = Math.round(Math.round(r / step) * step);
          const qg = Math.round(Math.round(g / step) * step);
          const qb = Math.round(Math.round(b / step) * step);

          const [dmcR, dmcG, dmcB] = this.nearestDMCColor(qr, qg, qb);
          finalR = Math.round(r * (1 - q) + dmcR * q);
          finalG = Math.round(g * (1 - q) + dmcG * q);
          finalB = Math.round(b * (1 - q) + dmcB * q);
        }

        const angle = Math.atan2(dy, dx) * angleMult + Math.sin(x * 0.1) * 0.3;
        const strokeLen = len * 1.8;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        ctx.lineCap = 'round';

        // Drop shadow
        if (shadowStr > 0.05) {
          ctx.strokeStyle = `rgba(0,0,0,${shadowStr * 0.4})`;
          ctx.lineWidth = thickness + 1.2;
          ctx.beginPath();
          ctx.moveTo(x - (strokeLen / 2) * cosA + 0.5, y - (strokeLen / 2) * sinA + 0.8);
          ctx.lineTo(x + (strokeLen / 2) * cosA + 0.5, y + (strokeLen / 2) * sinA + 0.8);
          ctx.stroke();
        }

        // Main thread body
        ctx.strokeStyle = `rgb(${finalR},${finalG},${finalB})`;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(x - (strokeLen / 2) * cosA, y - (strokeLen / 2) * sinA);
        ctx.lineTo(x + (strokeLen / 2) * cosA, y + (strokeLen / 2) * sinA);
        ctx.stroke();

        // Specular silk sheen highlight
        if (sheenStr > 0.05) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${sheenStr * 0.32})`;
          ctx.lineWidth = Math.max(0.7, thickness * 0.22);
          ctx.beginPath();
          ctx.moveTo(x - (strokeLen / 2) * cosA, y - (strokeLen / 2) * sinA - 0.4);
          ctx.lineTo(x + (strokeLen / 2) * cosA, y + (strokeLen / 2) * sinA - 0.4);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1.0;
  }

  drawLinenWeave(ctx, w, h, strength = 0.4) {
    ctx.save();
    ctx.strokeStyle = `rgba(214, 199, 179, ${strength})`;
    ctx.lineWidth = 1.2;

    for (let i = 0; i < w; i += 8) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
    }
    for (let j = 0; j < h; j += 8) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
    }
    ctx.restore();
  }
}
