import { Vec2 } from '../../../utils/vec2';
import { drawAxis, drawGraph } from './index';


export class graphDraw {
  protected drawAxis = drawAxis;
  protected drawGraph = drawGraph;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  protected widthGrap: number;
  protected scale: number;
  protected centreGrap: number;

  public paddinWidth: number;
  public paddinHeight: number;
  public centreGrapWidth: number;
  public centreGrapHeight: number;

  public offsetX: number;
  public offsetY: number;
  public sizeAxis: number;
  public size : Vec2;

  set offsetXset(val: number) { this.offsetX += val };
  set offsetYset(val: number) { this.offsetY += val };


  constructor(canvas: HTMLCanvasElement, scaleNum: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    this.paddinWidth = this.canvas.width;
    this.paddinHeight = this.canvas.height;
    this.centreGrapWidth = this.paddinWidth / 2;
    this.centreGrapHeight = this.paddinHeight / 2;

    this.offsetX = 0;
    this.offsetY = 0;
    this.sizeAxis = 5;
  

    this.size = new Vec2(Vec2.fromOffsetSize(this.canvas));

    this.widthGrap = 5;
    this.scale = scaleNum;

    this.centreGrap = 10;
  }

  set sizeAxisSet(val: number) { this.sizeAxis = val }

  set scaleNumSet(val: number) { this.scale = val }

  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.paddinWidth, this.paddinWidth);
  }

  public setSizeCanvas() {
    this.size = Vec2.fromOffsetSize(this.canvas);
    this.resetCanvas();
  }

  public resetCanvas() {
    this.drawAxis();
  }

  public graphDraawing(fun: (val: number) => number, color: string) {
    this.drawGraph(fun, color);
  }

}