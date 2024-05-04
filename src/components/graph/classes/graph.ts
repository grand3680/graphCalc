import { drawAxis, drawGraph } from "./index";


export class graph {
  protected drawAxis = drawAxis;
  public drawGraph = drawGraph;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public paddinWidth: number;
  public centreGrap: number;
  public widthGrap: number;
  public scaleNum: number;
  public gapTxt: number;
  public formula: string;
  public func: any;


  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    this.paddinWidth = canvas.width;
    this.centreGrap = this.paddinWidth / 2;
    this.widthGrap = 5;
    this.scaleNum = 4;
    this.gapTxt = Math.floor(this.paddinWidth / (this.scaleNum * 2));
    this.formula = "Math.sin(x**2)";

    this.func = new Function('x', 'return ' + this.formula);


    this.start();
  }

  public wheelEvent(event: WheelEvent) {
    if (event.deltaY < 0) {
      if (this.scaleNum - 2 <= 0) return;
      this.scaleNum -= 2;
    } else {
      this.scaleNum += 2;
    }

    this.ctx.clearRect(0, 0, this.paddinWidth, this.paddinWidth)
    this.start();
  }
  set formulaGraph(val: string) {
    try {
      this.formula = val;
      var correctFormla = this.formula
        .replace(/pi/g, "Math.PI")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos");

      this.func = new Function('x', 'return ' + correctFormla);

    } catch (error) {
      console.log(error);
    }
  }

  public start() {
    this.drawAxis();
    this.graphDraawing();
  }

  public graphFormula(x: number) {
    return this.func(x)
  }

  protected giveObj(x: number, y: number) {
    return {
      x: (x * this.gapTxt) + this.centreGrap,
      y: this.centreGrap - (y * this.gapTxt)
    }
  }

  public graphDraawing() {
    var xPrev = -this.scaleNum;
    var xNext = -this.scaleNum;

    while (xNext < this.scaleNum) {
      xNext = xPrev + 0.1;
      this.drawGraph(xPrev, xNext);
      xPrev = xNext;
    }
  }
}