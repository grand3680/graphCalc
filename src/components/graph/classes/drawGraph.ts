import { graph } from './index';

export function drawGraph(this: graph, xPrev: number, xNext: number): void {
  this.ctx.beginPath();
  this.ctx.strokeStyle = '#D28F4C';
  this.ctx.fillStyle = '#D28F4C';
  this.ctx.lineWidth = 1.5;

  var yPrev = this.graphFormula(xPrev);
  var ObjXYprev = this.giveObj(xPrev, yPrev)
  this.ctx.moveTo(ObjXYprev.x + this.widthGrap / 2, ObjXYprev.y);

  var yNext = this.graphFormula(xNext);
  var ObjXYnext = this.giveObj(xNext, yNext)
  this.ctx.lineTo(ObjXYnext.x + this.widthGrap / 2, ObjXYnext.y);
  this.ctx.fillRect(ObjXYnext.x, ObjXYnext.y, this.widthGrap, this.widthGrap);

  this.ctx.stroke();
  this.ctx.closePath();
}