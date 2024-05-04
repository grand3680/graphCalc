import { graphDraw } from "./index";

export function drawAxis(this: graphDraw): void {
  this.gapTxtX = this.paddinWidth / (this.scaleNum * 2);
  this.gapTxtY = this.paddinHeight / (this.scaleNum * 2);

  this.ctx.beginPath();
  this.ctx.font = "40px serif";
  this.ctx.fillStyle = "white";

  this.ctx.strokeStyle = 'white';

  // x and y line Axis
  this.ctx.fillRect(0, this.centreGrapHeight - this.offsetY, this.paddinWidth, 2);
  this.ctx.fillRect(this.centreGrapWidth - this.offsetX, 0, 2, this.paddinHeight);

  var temp = 1;
  for (var num = 0; num <= this.scaleNum * 2; num++) {
    temp = temp + this.gapTxtX;
    if (temp >= 40) {
      temp = 0

      // x, y small Axis graph      
      this.ctx.fillRect(0, (num * this.gapTxtY) - this.offsetY, this.paddinWidth, 0.5);
      this.ctx.fillRect((num * this.gapTxtX) - this.offsetX, 0, 0.5, this.paddinHeight);

      var numberAxix = (num - this.scaleNum).toString();

      this.ctx.fillText(numberAxix, this.gapTxtX * num + 5 - this.offsetX, this.centreGrapHeight - this.offsetY);
      this.ctx.fillText(numberAxix, this.centreGrapWidth + 5 - this.offsetX, this.paddinHeight - this.gapTxtY * num - this.offsetY); 
    };
  }

  this.ctx.stroke();
}