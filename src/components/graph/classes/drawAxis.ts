import { Vec2 } from "../../../utils/vec2";
import { precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";

export function drawAxis(this: graphDraw): void {
  var scale = this.scale;
  
  const { x: X, y: Y } = this.size.cdiv(scale).ctimes(.5);
  this.sizeAxisSet = Math.max(10, precision(Math.min(X, Y) / 5, 5));

  var dX = this.offsetX;
  var dY = this.offsetY;

  var aX = dX / scale;
  var aY = dY / scale;
  var size = this.sizeAxis;

  const center = new Vec2(this.size)
    .times(0.5)
    .plus(dX, dY);

  // Camera
  this.ctx.resetTransform();
  this.clearCanvas();
  this.ctx.setTransform(scale, 0, 0, scale, ...center.tuple);


  // Grid
  this.ctx.strokeStyle = 'white';
  this.ctx.strokeStyle = 'white';
  this.ctx.fillStyle = "white";
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

    this.ctx.lineWidth = 0.5 / scale;
    this.ctx.stroke();
  }
  this.ctx.closePath();

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

    for (let x = precision(-X - aX - size, size); x <= X - aX; x += size) {
      if (x / 10 | 0)
        this.ctx.fillText(` ${x / 10 | 0} `, x, 0);
    }

    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';

    for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += size) {
      if (y / 10 | 0)
        this.ctx.fillText(` ${-y / 10 | 0} `, 0, y);
    }
  }
}