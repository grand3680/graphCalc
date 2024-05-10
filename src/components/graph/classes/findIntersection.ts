import { precision } from "../../../utils/mathCalc";
import { graphDraw } from "./index";

interface FunctionObject {
  typeFun: string;
  graphFormula: any;
  color: string;
}


export function findIntersectionPoints(this: graphDraw,
  func1: FunctionObject,
  func2: FunctionObject,
): number[][] {
  var scale = this.scaleNumGet;
  var showVal = this.size.cdiv(scale);

  const { x: X, y: Y } = showVal;

  var dX = this.offsetX;
  var dY = this.offsetY;

  var aX = dX / scale;
  var aY = dY / scale;
  var size = this.sizeAxis;

  var startX, startY, end;

  if (func1.typeFun === 'X') {
    startX = precision(-X - aX - size, size); // x
    startY = precision(-Y - aY - size, size); // y
    end = X - aX;
  } else {
    startX = precision(-Y - aY - size, size); // y
    startY = precision(-X - aX - size, size); // x
    end = Y - aY;
  }

  const step = 0.1;

  const intersections: number[][] = [];

  if (func1.typeFun === 'X' && func2.typeFun === 'X') {
    for (let x = startX; x <= end; x += step) {
      const y1 = func1.graphFormula(x / 10);
      const y2 = func2.graphFormula(x / 10);
      if (Math.abs(y1 - y2) < 0.1) {
        intersections.push([x, -y1]);
      }
    }
  } else if (func1.typeFun === 'Y' && func2.typeFun === 'Y') {
    for (let y = startY; y <= end; y += step) {
      const x1 = func1.graphFormula(y / 10);
      const x2 = func2.graphFormula(y / 10);
      if (Math.abs(x1 - x2) < 0.1) {
        intersections.push([x1, -y]);
      }
    }
  } else { // One function in terms of x, the other in terms of y
    const rangeX = (func1.typeFun === 'X') ? [startX, end] : [startY, end];
    const rangeY = (func2.typeFun === 'X') ? [startY, end] : [startX, end];
    for (let x = rangeX[0]; x <= rangeX[1]; x += step) {
      for (let y = rangeY[0]; y <= rangeY[1]; y += step) {
        const y1 = func1.graphFormula(x / 10);
        const x2 = func2.graphFormula(y / 10);
        if (Math.abs(x - x2) < 0.1 && Math.abs(y - y1) < 0.1) {
          intersections.push([x, -y1]);
        }
      }
    }
  }

  return intersections;
}
