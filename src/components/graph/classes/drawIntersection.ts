import { typeFuncT } from './graph';
import { graphDraw } from './index';

type funGI = Omit<typeFuncT, 'indexFun'>;

export function drawIntersection(this: graphDraw): void {
  const someFun1: funGI = {
    typeFun: 'x',
    color: '#fff',
    graphFormula: (x: number) => {
      return Math.sin(x);
    },
  };
  const someFun2: funGI = {
    typeFun: 'x',
    color: '#fff',
    graphFormula: (x: number) => {
      return Math.cos(x);
    },
  };

  const intersections: number[][] = this.findIntersectionPoints(someFun1, someFun2);

  this.ctx.beginPath();
  for (let i = 0; i < intersections.length; i++) {
    this.ctx.rect(intersections[i][0], intersections[i][1], 1, 1);
  }
  this.ctx.strokeStyle = '#fff';
  this.ctx.stroke();
  this.ctx.closePath();
}
