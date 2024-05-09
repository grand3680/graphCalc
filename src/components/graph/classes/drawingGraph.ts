import { precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";


interface funGI {
  typeFun : string,
  color : string,    
  graphFormula: (val: number) => number,
}

export function drawGraph(
  this: graphDraw,
  funcG : funGI
): void {
  var scale = this.scale;
  // gap to x in function div to scale and next to tuple size [width, heigh]
  var {x : gapX, y : gapY} = this.size.cdiv(scale).cdiv(this.size)
  
  var showVal = this.size.cdiv(scale).ctimes(2);
  
  var dX = -this.offsetX;
  var dY = -this.offsetY;
  
  var aX = dX / scale;
  var aY = dY / scale;
  var size = this.sizeAxis;

  // time val to 1/2
  const { x: X, y: Y } = showVal.ctimes(2);

  if (funcG.typeFun === 'x') {
    this.ctx.beginPath();
    
    var first = true;
    for (let x = precision(-X - aX - size, size); x <= X - aX; x += gapX) {
      this.ctx[first ? 'moveTo' : 'lineTo'](x, -funcG.graphFormula(x / 10) * 10);
      first = false;
    }

    this.ctx.strokeStyle = funcG.color;
    this.ctx.stroke();
    this.ctx.closePath();  
  }

  if (funcG.typeFun === 'y') {
    this.ctx.beginPath();
    
    var first = true;
    for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += gapY) {
      this.ctx[first ? 'moveTo' : 'lineTo'](funcG.graphFormula(y / 10) * 10, y);
      first = false;
    }

    this.ctx.strokeStyle = funcG.color;
    this.ctx.stroke();
    this.ctx.closePath();  
  }
  

}