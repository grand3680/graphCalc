import { precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";


export function findIntersectionPoints(this: graphDraw, 
  func1: any,
  func2: any,
): number[][] {

  var scale = this.scaleNumGet;
  var showVal = this.size.cdiv(scale);

  const { x: X } = showVal.ctimes(0.5);

  var dX = -this.offsetX;
  
  var aX = dX / scale;
  var size = this.sizeAxis;

  var start = precision(-X - aX - size, size);
  var end = X - aX;


  const intersections: number[][] = [];
  const step = 0.1; 
  for (let x = start; x <= end; x += step) {
    const y1 = func1(x);
    const y2 = func2(x);
    if (Math.abs(y1 - y2) < 0.1) {
      intersections.push([x, y1]);
    }
  }
  return intersections;
}
