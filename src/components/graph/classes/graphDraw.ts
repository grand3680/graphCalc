import { drawAxis, drawGraph } from './index';


export class graphDraw {
  protected drawAxis = drawAxis;
  protected drawGraph = drawGraph;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  protected widthGrap: number;
  protected scaleNum: number;
  public gapTxtX: number;
  public gapTxtY: number;
  protected centreGrap: number;

  public paddinWidth: number;
  public paddinHeight: number;
  public centreGrapWidth: number;
  public centreGrapHeight: number;

  public offsetX: number;
  public offsetY: number;

  set offsetXset(val: number) { this.offsetX += val };
  set offsetYset(val: number) { this.offsetY += val }


  constructor(canvas: HTMLCanvasElement, scaleNum: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    this.paddinWidth = this.canvas.width;
    this.paddinHeight = this.canvas.height;
    this.centreGrapWidth = this.paddinWidth / 2;
    this.centreGrapHeight = this.paddinHeight / 2;

    this.offsetX = 0;
    this.offsetY = 0;

    this.widthGrap = 5;
    this.scaleNum = scaleNum;

    this.gapTxtX = Math.floor(this.paddinWidth / (this.scaleNum * 2));
    this.gapTxtY = Math.floor(this.paddinHeight / (this.scaleNum * 2));

    this.centreGrap = 10;
  }

  set scaleNumSet(val: number) {
    this.scaleNum = val
  }

  protected giveObj(x: number, y: number) {
    return {
      x: (x * this.gapTxtX) + this.centreGrapWidth - this.offsetX,
      y: this.centreGrapHeight - (y * this.gapTxtY) - this.offsetY
    }
  }

  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.paddinWidth, this.paddinWidth);
  }

  public setSizeCanvas() {
    this.paddinWidth = this.canvas.width;
    this.paddinHeight = this.canvas.height;
    this.centreGrapWidth = this.paddinWidth / 2;
    this.centreGrapHeight = this.paddinHeight / 2;
    this.resetCanvas();
  }

  public resetCanvas() {
    this.clearCanvas();
    this.drawAxis();
  }

  public graphDraawing(fun: (val: number) => number, color: string) {
    var xPrev = -this.scaleNum;
    var xNext = -this.scaleNum;

    while (xNext < this.scaleNum) {
      xNext = xPrev + 0.1;
      this.drawGraph(xPrev, xNext, fun, color);
      xPrev = xNext;
    }
  }
}