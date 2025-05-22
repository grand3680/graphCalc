import { Vec2 } from '@/utils/vec2';
import { drawAxis, drawGraph, drawIntersection, findIntersectionPoints } from './index';
import { typeFuncT } from './graph';

export type typeGridT = 'grid' | 'polar';

export class graphDraw {
  protected findIntersectionPoints = findIntersectionPoints;
  protected drawIntersection = drawIntersection;
  public drawGraph = drawGraph;
  public drawAxis = drawAxis;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  protected centreGrap: number = 10;
  public scale: number = 1;

  protected allDrawFuncs: Path2D[] = [];
  public offsetX: number = 0;
  public offsetY: number = 0;
  public sizeAxis: number = 20;
  // tuple {x, y} width \ heigh canvas
  public size: Vec2 = new Vec2();
  public mouse: Vec2 = new Vec2();
  public typeGrid: typeGridT = 'grid';

  set mouseSet(val: Vec2) {
    this.mouse = val;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    this.setSizeCanvas();
  }

  protected clearCanvas() {
    const { x: width, y: height } = this.size;

    this.ctx.clearRect(0, 0, width, height);
  }

  public drawGraphFuns(funcs: typeFuncT[]) {
    for (let i = 0; i < funcs.length; i++) {
      this.drawGraph(funcs[i]);
    }
  }

  public toScale(scale: number, mouse = this.mouse) {
    const size = this.size.cdiv(2);
    const start = mouse.cminus(size).minus(this.offsetX, this.offsetY).cdiv(this.scale);

    this.scale = scale;

    mouse
      .minus(size)
      .minus(this.offsetX, this.offsetY)
      .div(this.scale)
      .minus(start)
      .times(this.scale)
      .plus(this.offsetX, this.offsetY);

    this.offsetX = mouse.x;
    this.offsetY = mouse.y;
  }

  public setSizeCanvas() {
    this.size = Vec2.fromOffsetSize(this.canvas);

    const { x: Width, y: Height } = this.size;

    this.canvas.width = Width;
    this.canvas.height = Height;

    this.drawAxis();
  }
}
