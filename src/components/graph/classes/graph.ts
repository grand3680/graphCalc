import { graphDraw } from "./index";


export class graph {
  public canvas: HTMLCanvasElement;
  public drawGraph: graphDraw;
  public colors : string[];

  public scaleNum: number;
  public func: any[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.scaleNum = 4;

    this.func = [new Function('x', 'return ' + "Math.tan(x)")];

    this.drawGraph = new graphDraw(this.canvas, this.scaleNum)
    this.colors = ["#ff0000", "#D28F4C"];

    this.drawGraph.resetCanvas();
  }

  public wheelEvent(event: WheelEvent) {
    if (event.deltaY < 0) {
      if (this.scaleNum - 2 <= 0) return;
      this.scaleNum -= 2;
    } else {
      this.scaleNum += 2;
    }

    this.drawGraph.clearCanvas();
    this.drawGraph.scaleNumSet = this.scaleNum;

    this.start();
  }
  public formulaGraph(val: string, indexInput : number) {
    try {
      console.log(indexInput);
      var correctFormla = val
        .replace(/pi/g, "Math.PI")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/e/g, "Math.exp(1)")
        .replace(/\^/g, "**")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log")
      .replace(/ctg/g, "1/Math.tan(x)")

      this.func[indexInput] = new Function('x', 'return ' + correctFormla);
      this.start();
    } catch (error) {
      console.log(error);
    }
  }
  set funcSet(val : any[]) {this.func = val;}
  get funcGet(){return this.func}

  public setSizeCanvas() { this.drawGraph.setSizeCanvas(); }


  public start() {
    this.drawGraph.resetCanvas();
    for (var i = 0; i < this.func.length; i++) {
      this.drawGraph.graphDraawing(this.func[i], this.colors[i]);
    }
  }
}