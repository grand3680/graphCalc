import { Vec2 } from '../../../utils/vec2';
import { drawAxis, drawGraph, drawIntersection, findIntersectionPoints } from './index';

export class graphDraw {
  protected findIntersectionPoints = findIntersectionPoints;
  protected drawIntersection = drawIntersection;
  public drawGraph = drawGraph;
  public drawAxis = drawAxis;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  protected scale: number;
  protected centreGrap: number;

  public offsetX: number;
  public offsetY: number;
  public sizeAxis: number;
  // tuple {x, y} width \ heigh canvas
  public size: Vec2 = new Vec2();
  public mouse: Vec2 = new Vec2();

  set offsetXplus(val: number) { this.offsetX += val };
  set offsetYplus(val: number) { this.offsetY += val };

  set offsetXset(val: number) { this.offsetX = val };
  set offsetYset(val: number) { this.offsetY = val }

  get offsetXget() { return this.offsetX };
  get offsetYget() { return this.offsetY };

  set sizeAxisSet(val: number) { this.sizeAxis = val }
  get scaleNumGet() { return this.scale }
  get sizeGet() { return this.size }

  set mouseSet(val: Vec2) { this.mouse = val; }
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    this.offsetX = 0;
    this.offsetY = 0;
    this.sizeAxis = 20;

    this.setSizeCanvas();

    this.scale = 1;

    this.centreGrap = 10;
  }

  protected clearCanvas() {
    const { x: width, y: height } = this.size;

    this.ctx.clearRect(0, 0, width, height);
  }

  public toScale(scale: number, mouse = this.mouse) {
    const size = this.size.cdiv(2);
    const start = mouse
      .cminus(size)
      .minus(this.offsetX, this.offsetY)
      .cdiv(this.scale);

    this.scale = scale;

    mouse
      .minus(size)
      .minus(this.offsetX, this.offsetY)
      .div(this.scale)
      .minus(start)
      .times(this.scale)
      .plus(this.offsetX, this.offsetY)

    this.offsetXset = mouse.x;
    this.offsetYset = mouse.y;
  }

  public setSizeCanvas() {
    this.size = Vec2.fromOffsetSize(this.canvas);

    const { x: Width, y: Height } = this.size;

    this.canvas.width = Width;
    this.canvas.height = Height;

    this.drawAxis();
  }
}