import { graphDraw } from "./index";

interface funGI {
  typeFun: string,
  color: string,
  graphFormula: any,
}

export function drawIntersection(
  this: graphDraw,
): void {

  var someFun1 : funGI = {
    typeFun: "x",
    color: "#fff",
    graphFormula: (x :number) => {return Math.sin(x)}
  }
  var someFun2 : funGI = {
    typeFun: "x",
    color: "#fff",
    graphFormula: (x :number) => {return Math.cos(x)}
  }


  var intersections : number[][] = this.findIntersectionPoints(someFun1, someFun2);
  console.log(intersections);

  this.ctx.beginPath();
  for (var i = 0; i < intersections.length; i++) {
    this.ctx.rect(intersections[i][0], intersections[i][1], 1, 1);
  }
  this.ctx.strokeStyle = "#fff";
  this.ctx.stroke();
  this.ctx.closePath();
}











