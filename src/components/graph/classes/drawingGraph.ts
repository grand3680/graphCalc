import { precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";

export function drawGraph(
  this: graphDraw,
  graphFormula: (val: number) => number,
  color : string,
): void {

  
  var scale = this.scale;
  var p = this.size.cdiv(scale).cdiv(this.size)
  var showVal = this.size.cdiv(scale);
  
  const { x: X, y: Y } = showVal.ctimes(.5);
  console.log(Y);


  var dX = -this.offsetX;
  // var dY = -this.offsetY;

  var aX = dX / scale;
  // var aY = dY / scale;
  var size = this.sizeAxis;

  this.ctx.beginPath();
  
  var first = true;
  for (let x = precision(-X - aX - size, size); x <= X - aX; x += p.x) {
    this.ctx[first ? 'moveTo' : 'lineTo'](x, -graphFormula(x / 10) * 10);
    first = false;
  }

  this.ctx.strokeStyle = color ?? '#33f';
  this.ctx.stroke();
  this.ctx.closePath();
}