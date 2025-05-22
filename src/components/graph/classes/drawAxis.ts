import { Vec2 } from '@/utils/vec2';
import { minMax, precision } from '@/utils/mathCalc';
import { graphDraw } from './index';

export function drawAxis(this: graphDraw): void {
  const scale = this.scale;

  const { x: X, y: Y } = this.size.cdiv(scale).cdiv(2);
  if (!isFinite(X) || !isFinite(Y)) return;

  this.sizeAxis = Math.max(5, precision(Math.min(X, Y) / 5, 5));

  const dX = this.offsetX;
  const dY = this.offsetY;

  const aX = dX / scale;
  const aY = dY / scale;
  const size = this.sizeAxis;

  const center = new Vec2(this.size).div(2).plus(dX, dY);

  // Camera
  this.ctx.resetTransform();
  this.clearCanvas();
  this.ctx.setTransform(scale, 0, 0, scale, ...center.tuple);

  if (this.typeGrid == 'polar') {
    const maxRadius = Math.sqrt(Math.pow(X + Math.abs(aX), 2) + Math.pow(Y + Math.abs(aY), 2));
    // Draw concentric circles
    this.ctx.beginPath();
    for (let radius = size; radius <= maxRadius; radius = precision(radius + size, size)) {
      this.ctx.moveTo(radius, 0);
      this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    }
    this.ctx.lineWidth = 1 / scale;
    this.ctx.strokeStyle = '#666666';
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.fillStyle = '#fff';
    this.ctx.font = `${20 / scale}px monospace`;
    {
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'bottom';

      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * (2 * Math.PI);
        const x = precision(Math.max(size, maxRadius - size * 4), size) * Math.cos(angle);
        const y = precision(Math.max(size, maxRadius - size * 4), size) * Math.sin(angle);

        const angleInDegrees = (angle * (180 / Math.PI)).toFixed(0) + '°';
        this.ctx.fillText(angleInDegrees, x, y);
      }

      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'middle';
    }

    // Draw smaller concentric circles
    this.ctx.beginPath();
    for (let radius = size / 5; radius <= maxRadius; radius += precision(radius + size / 5, size / 5)) {
      this.ctx.moveTo(radius, 0);
      this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    }
    this.ctx.lineWidth = 0.5 / scale;
    this.ctx.strokeStyle = '#3A3A3A';
    this.ctx.stroke();
    this.ctx.closePath();

    // Draw radial lines
    this.ctx.beginPath();
    const numRadialLines = 20; // Number of radial lines
    for (let i = 0; i < numRadialLines; i++) {
      const angle = (i / numRadialLines) * (2 * Math.PI);
      const x = maxRadius * Math.cos(angle);
      const y = maxRadius * Math.sin(angle);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineWidth = 0.75 / scale;
    this.ctx.strokeStyle = '#666666';
    this.ctx.stroke();
    this.ctx.closePath();

    // Draw smaller radial lines
    this.ctx.beginPath();
    const numSmallRadialLines = numRadialLines * 6; // Number of radial lines
    for (let i = 0; i < numSmallRadialLines; i++) {
      const angle = (i / numSmallRadialLines) * 2 * Math.PI;
      const x = maxRadius * Math.cos(angle);
      const y = maxRadius * Math.sin(angle);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineWidth = 0.5 / scale;
    this.ctx.strokeStyle = '#3A3A3A';
    this.ctx.stroke();
    this.ctx.closePath();
  }

  if (this.typeGrid == 'grid') {
    this.ctx.beginPath();
    {
      for (let x = precision(-X - aX - size, size); x <= X - aX; x += size) {
        this.ctx.moveTo(x, -Y - aY);
        this.ctx.lineTo(x, Y - aY);
      }

      for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += size) {
        this.ctx.moveTo(-X - aX, y);
        this.ctx.lineTo(X - aX, y);
      }

      this.ctx.lineWidth = 1 / scale;
      this.ctx.strokeStyle = '#666666';
      this.ctx.fillStyle = '#666666';
      this.ctx.stroke();
    }
    this.ctx.closePath();

    // small Grid
    this.ctx.beginPath();
    {
      for (let x = precision(-X - aX - size, size); x <= X - aX; x += size / 5) {
        this.ctx.moveTo(x, -Y - aY);
        this.ctx.lineTo(x, Y - aY);
      }

      for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += size / 5) {
        this.ctx.moveTo(-X - aX, y);
        this.ctx.lineTo(X - aX, y);
      }

      this.ctx.lineWidth = 0.5 / scale;
      this.ctx.strokeStyle = '#3A3A3A';
      this.ctx.fillStyle = '#3A3A3A';
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }

  // Axies
  this.ctx.strokeStyle = '#733';
  this.ctx.beginPath();
  {
    this.ctx.moveTo(0, -Y - aY);
    this.ctx.lineTo(0, Y - aY);

    this.ctx.moveTo(-X - aX, 0);
    this.ctx.lineTo(X - aX, 0);

    this.ctx.lineWidth = 4 / scale;
    this.ctx.stroke();
  }
  this.ctx.closePath();

  // Digits
  this.ctx.fillStyle = '#fff';
  this.ctx.font = `${20 / scale}px monospace`;
  {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'bottom';

    const startPosX = precision(-X - aX - size * 2, size * 2);
    for (let x = startPosX; x <= X - aX; x += size * 2) {
      if (x / 10 == 0) continue;
      const text = ` ${x / 10} `;
      const { hangingBaseline } = this.ctx.measureText(text); // check height txt

      // min to 0 of x and max to + hangingBaseline
      this.ctx.fillText(text, x, minMax(1.5 * hangingBaseline, -Y - aY + hangingBaseline, Y - aY));
    }

    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';

    const startPosY = precision(-Y - aY - size * 2, size * 2);
    for (let y = startPosY; y <= Y - aY; y += size * 2) {
      if (-y / 10 == 0) continue;
      const text = ` ${-y / 10} `;
      const { width } = this.ctx.measureText(text); // check width txt

      // min to -width of y and max to + width
      this.ctx.fillText(text, minMax(-width, -X - aX, X - aX - width), y);
    }

    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'bottom';
    const zeroText = ` 0 `;
    const { width } = this.ctx.measureText(zeroText);
    this.ctx.fillText(zeroText, -width, width);
  }
}
