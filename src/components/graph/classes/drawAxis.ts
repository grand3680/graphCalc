import { graphDraw } from "./index";

export function drawAxis(this: graphDraw): void {
  this.gapTxtX = this.paddinWidth / (this.scaleNum * 2);
  this.gapTxtY = this.paddinHeight / (this.scaleNum * 2);

  this.ctx.beginPath();
  this.ctx.font = "40px serif";
  this.ctx.fillStyle = "white";

  this.ctx.strokeStyle = 'white';

  // x and y line Axis
  this.ctx.fillRect(0, this.centreGrapHeight, this.paddinWidth, 2);
  this.ctx.fillRect(this.centreGrapWidth, 0, 2, this.paddinHeight);

  var temp = 1;
  for (var i = 0; i <= this.scaleNum * 2; i++) {
    temp = temp + this.gapTxtX;
    if (temp >= 40) {
      temp = 0

      // x, y small Axis graph      
      this.ctx.fillRect(0, i * this.gapTxtY, this.paddinWidth, 0.5);
      this.ctx.fillRect(i * this.gapTxtX, 0, 0.5, this.paddinHeight);


      this.ctx.fillText((i - (this.scaleNum * 2) / 2).toString(), this.gapTxtX * i + 5, this.centreGrapHeight);
      this.ctx.fillText((i - (this.scaleNum * 2) / 2).toString(), this.centreGrapWidth + 5, this.paddinHeight - this.gapTxtY * i);
    };
  }

  this.ctx.stroke();
}