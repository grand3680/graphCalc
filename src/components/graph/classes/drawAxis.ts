import { graph } from "./index";

export function drawAxis(this: graph): void {
  this.gapTxt = this.paddinWidth / (this.scaleNum * 2);

  this.ctx.beginPath();
  this.ctx.font = "26px serif";
  this.ctx.fillStyle = "white";

  this.ctx.strokeStyle = 'white';
  this.ctx.fillRect(0, this.paddinWidth / 2, this.paddinWidth, 2);
  this.ctx.fillRect(this.paddinWidth / 2, 0, 2, this.paddinWidth);

  var temp = 1;
  for (var i = 0; i <= this.scaleNum * 2; i++) {
    temp = temp + this.gapTxt;
    if (temp >= 26) {
      temp = 0
      this.ctx.fillRect(0, i * this.gapTxt, this.paddinWidth, 0.5);
      this.ctx.fillRect(i * this.gapTxt, 0,   0.5, this.paddinWidth);

      this.ctx.fillText((i - (this.scaleNum * 2) / 2).toString(), this.gapTxt * i + 5, this.centreGrap);
      this.ctx.fillText((i - (this.scaleNum * 2) / 2).toString(), this.centreGrap + 5, this.paddinWidth - this.gapTxt * i);
    };
  }

  this.ctx.stroke();
}