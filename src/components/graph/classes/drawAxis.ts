import { Vec2 } from "../../../utils/vec2";
import { minMax, precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";

export function drawAxis(this: graphDraw): void {
  var scale = this.scale;

  const { x: X, y: Y } = this.size.cdiv(scale).cdiv(2);
  this.sizeAxisSet = Math.max(10, precision(Math.min(X, Y) / 5, 5));

  var dX = this.offsetX;
  var dY = this.offsetY;

  var aX = dX / scale;
  var aY = dY / scale;
  var size = this.sizeAxis;

  const center = new Vec2(this.size)
    .div(2)
    .plus(dX, dY);

  // Camera
  this.ctx.resetTransform();
  this.clearCanvas();
  this.ctx.setTransform(scale, 0, 0, scale, ...center.tuple);


  // Grid
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
    this.ctx.fillStyle = "#666666";
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
    this.ctx.fillStyle = "#3A3A3A";
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

    let startPosX = precision(-X - aX - size, size);
    for (let x = startPosX; x <= X - aX; x += size) {
      if (x == 0) continue;
      let text =  ` ${x / 10} `;
      // delete float at the higt scale
      if (Math.abs(startPosX / 10) > 20) text = ` ${x / 10 | 0} `;

      const { hangingBaseline } = this.ctx.measureText(text); // check height txt

      // min to 0 of x and max to + hangingBaseline
      this.ctx.fillText(text, x, minMax(0, -Y - aY + hangingBaseline, Y - aY));
    }

    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    let startPosY = precision(-Y - aY - size, size)
    for (let y = startPosY; y <= Y - aY; y += size) {
      if (y == 0) continue;

      let text = ` ${-y / 10} `;
      // delete float at the higt scale
      if (Math.abs(startPosY / 10) > 20) text = ` ${-y / 10 | 0} `;
      
      const { width } = this.ctx.measureText(text); // check width txt

      // min to 0 of y and max to + width
      this.ctx.fillText(text, minMax(0, -X - aX, X - aX - width), y);
    }


    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(` 0 `, 0, 0);
  }
}