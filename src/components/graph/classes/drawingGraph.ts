import { precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";


interface funGI {
  typeFun: string,
  color: string,
  graphFormula: (val: number) => number,
}

export function drawGraph(
  this: graphDraw,
  funcG: funGI
): void {
  var scale = this.scale;
  // gap to x in function div to scale and next to tuple size [width, heigh]
  var showVal = this.size.cdiv(scale);
  var { x: gapX, y: gapY } = this.size.cdiv(scale).cdiv(this.size);
  // this.drawIntersection();

  var dX = this.offsetX;
  var dY = this.offsetY;

  var aX = dX / scale;
  var aY = dY / scale;
  var size = this.sizeAxis;

  // time val to 1/2
  const { x: X, y: Y } = showVal.cdiv(2);
  if (funcG.typeFun === 'x') {
    this.ctx.beginPath();

    var first = true;
    var previousGraphValue = null;
    const jumpThreshold = Math.abs(-Y-aY)/scale;

    for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += gapY) {
      let graphValue = funcG.graphFormula(-y / 10) * 10;

      if (!isFinite(graphValue)) {
        first = true;
        continue;
      }

      if (previousGraphValue !== null && (Math.abs(graphValue - previousGraphValue) > jumpThreshold)) {
        first = true;
      }
      this.ctx[first ? 'moveTo' : 'lineTo'](graphValue, y);
      first = false;

      previousGraphValue = graphValue;
    }

    this.ctx.strokeStyle = funcG.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  if (funcG.typeFun === 'y') {
    this.ctx.beginPath();

    var first = true;
    var previousGraphValue = null;
    const jumpThreshold = Math.abs(-X-aX)/scale;

    for (let x = precision(-X - aX - size, size); x <= X - aX; x += gapX) {
      let graphValue = -funcG.graphFormula(x / 10) * 10;

      if (!isFinite(graphValue)) {
        first = true;
        continue;
      }

      if (previousGraphValue !== null && (Math.abs(graphValue - previousGraphValue) > jumpThreshold)) {
        first = true;
      }
      this.ctx[first ? 'moveTo' : 'lineTo'](x, graphValue);
      first = false;

      previousGraphValue = graphValue;
    }

    this.ctx.strokeStyle = funcG.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}