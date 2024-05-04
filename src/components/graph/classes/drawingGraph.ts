import { graphDraw } from "./index";

export function drawGraph(
  this: graphDraw,
  xPrev: number,
  xNext: number,
  graphFormula: (val: number) => number,
  color : string,
): void {

  this.ctx.beginPath();
  this.ctx.strokeStyle = color;
  this.ctx.fillStyle = color;
  this.ctx.lineWidth = 1.5;

  var yPrev = graphFormula(xPrev);
  var ObjXYprev = this.giveObj(xPrev, yPrev)
  this.ctx.moveTo(ObjXYprev.x + this.widthGrap / 2, ObjXYprev.y);

  var yNext = graphFormula(xNext);
  var ObjXYnext = this.giveObj(xNext, yNext)
  this.ctx.lineTo(ObjXYnext.x + this.widthGrap / 2, ObjXYnext.y);
  this.ctx.fillRect(ObjXYnext.x, ObjXYnext.y, this.widthGrap, this.widthGrap);

  this.ctx.stroke();
  this.ctx.closePath();
}