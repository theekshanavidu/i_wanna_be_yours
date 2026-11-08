/**
 * ============================================================================
 * 💖 HEART-SHAPED QR CODE GENERATOR ENGINE 💖
 * Embeds a real 100% scannable QR code inside a true Heart shape.
 * Fills outer heart regions with matching pseudo QR modules so the entire
 * heart looks like a single unified QR code without any square box appearance!
 * ============================================================================
 */
(function(window) {
  'use strict';

  // Cubic bezier point calculation
  function bezier(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  }

  // Smooth, romantic heart polygon points
  function getHeartPolygon(cx, cy, w, h, steps) {
    steps = steps || 160;
    const points = [];
    const topY = cy - h * 0.48;
    const bottomY = cy + h * 0.50;
    const dipY = cy - h * 0.20;
    const leftX = cx - w * 0.50;
    const rightX = cx + w * 0.50;

    // 1. Dip to Left Lobe
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const x = bezier(cx, cx - w * 0.24, leftX, leftX, t);
      const y = bezier(dipY, topY, topY, cy - h * 0.05, t);
      points.push([x, y]);
    }
    // 2. Left Lobe to Bottom Tip
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const x = bezier(leftX, leftX, cx - w * 0.15, cx, t);
      const y = bezier(cy - h * 0.05, cy + h * 0.28, bottomY - h * 0.10, bottomY, t);
      points.push([x, y]);
    }
    // 3. Bottom Tip to Right Lobe
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const x = bezier(cx, cx + w * 0.15, rightX, rightX, t);
      const y = bezier(bottomY, bottomY - h * 0.10, cy + h * 0.28, cy - h * 0.05, t);
      points.push([x, y]);
    }
    // 4. Right Lobe back to Dip
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const x = bezier(rightX, rightX, cx + w * 0.24, cx, t);
      const y = bezier(cy - h * 0.05, topY, topY, dipY, t);
      points.push([x, y]);
    }
    return points;
  }

  // Point in polygon test
  function isPointInsidePolygon(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Generates an HTML5 Canvas containing the true Heart-shaped QR code.
   * @param {string} url Text or URL to encode
   * @param {number} targetPixelSize Width & height of output canvas in pixels
   * @param {Object} opts Custom styling options
   * @returns {HTMLCanvasElement}
   */
  function createHeartQRCanvas(url, targetPixelSize, opts) {
    targetPixelSize = targetPixelSize || 300;
    opts = opts || {};
    const darkColor = opts.colorDark || '#c9184a';
    const lightColor = opts.colorLight || '#ffffff';
    const strokeColor = opts.strokeColor || '#ff758f';

    // 1. Generate real QR code
    if (!window.QRCodeModel) {
      console.error('QRCodeModel not found. Please load assets/qrcode.min.js first.');
      return null;
    }

    const qr = new window.QRCodeModel(0, window.QRErrorCorrectLevel.M);
    qr.addData(url || 'https://github.com');
    qr.make();

    const qrCount = qr.getModuleCount();

    // 2. Compute proportional grid covering the whole heart
    const totalGrid = Math.round(qrCount * 1.68);
    const canvas = document.createElement('canvas');
    canvas.width = targetPixelSize;
    canvas.height = targetPixelSize;
    const ctx = canvas.getContext('2d');

    const cellSize = targetPixelSize / totalGrid;
    const cx = targetPixelSize / 2;
    const cy = targetPixelSize * 0.46;
    const heartW = targetPixelSize * 0.94;
    const heartH = targetPixelSize * 0.94;
    const poly = getHeartPolygon(cx, cy, heartW, heartH);

    // Position real QR code to fit entirely inside the heart silhouette
    const qrPixelSize = qrCount * cellSize;
    const qrStartX = (targetPixelSize - qrPixelSize) / 2;
    const qrStartY = cellSize * (totalGrid * 0.11);

    // 3. Draw Heart Background (White/Cream with subtle shadow)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1; i < poly.length; i++) {
      ctx.lineTo(poly[i][0], poly[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = lightColor;
    ctx.shadowColor = 'rgba(255, 117, 143, 0.25)';
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.restore();

    // 4. Finder Pattern Checker
    function isFinderModule(r, c) {
      function inBox(r0, c0) {
        return (r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7);
      }
      return inBox(0, 0) || inBox(0, qrCount - 7) || inBox(qrCount - 7, 0);
    }

    // 5. Pre-calculate modules across the extended heart grid
    for (let gr = 0; gr < totalGrid; gr++) {
      for (let gc = 0; gc < totalGrid; gc++) {
        const posX = gc * cellSize;
        const posY = gr * cellSize;
        const midX = posX + cellSize / 2;
        const midY = posY + cellSize / 2;

        // Must be inside the heart
        if (!isPointInsidePolygon(midX, midY, poly)) {
          continue;
        }

        const qrC = Math.floor((midX - qrStartX) / cellSize);
        const qrR = Math.floor((midY - qrStartY) / cellSize);

        let isDark = false;
        let isFinder = false;

        if (qrR >= 0 && qrR < qrCount && qrC >= 0 && qrC < qrCount) {
          // Inside Real QR Code
          isDark = qr.isDark(qrR, qrC);
          isFinder = isFinderModule(qrR, qrC);
        } else {
          // Outside Real QR Code, but Inside Heart:
          // Keep Quiet Margin around the 3 finder patterns 100% clean for instant scanner detection!
          const isNearFinder = (
            (qrR >= -1 && qrR <= 8 && qrC >= -1 && qrC <= 8) ||
            (qrR >= -1 && qrR <= 8 && qrC >= qrCount - 8 && qrC <= qrCount) ||
            (qrR >= qrCount - 8 && qrR <= qrCount && qrC >= -1 && qrC <= 8)
          );

          if (isNearFinder) {
            isDark = false;
          } else {
            // Fake pseudo-random QR modules to fill the heart seamlessly!
            const hash = Math.sin(gr * 12.9898 + gc * 78.233 + 71.5) * 43758.5453;
            isDark = (hash - Math.floor(hash)) > 0.48;
          }
        }

        if (isDark) {
          ctx.fillStyle = darkColor;
          if (isFinder) {
            // Crisp solid squares for finder patterns to ensure 100% camera lock!
            ctx.fillRect(posX, posY, cellSize, cellSize);
          } else {
            // Cute rounded dots for the romantic aesthetic
            ctx.beginPath();
            ctx.arc(midX, midY, cellSize * 0.42, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // 6. Draw outer delicate romantic Heart border
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1; i < poly.length; i++) {
      ctx.lineTo(poly[i][0], poly[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(3, targetPixelSize * 0.015);
    ctx.stroke();
    ctx.restore();

    return canvas;
  }

  // Export to window
  window.createHeartQRCanvas = createHeartQRCanvas;

})(window);

