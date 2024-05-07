import { Vec2 } from '../../../utils/vec2';
import { precision } from "../../../utils/mathCalc";
import { drawAxis, drawGraph } from './index';


interface funG {
  typeFun : string,
  color : string,    
  graphFormula: (val: number) => number,
}


export class graphDraw {
  protected drawAxis = drawAxis;
  protected drawGraph = drawGraph;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  protected widthGrap: number;
  protected scale: number;
  protected centreGrap: number;

  public offsetX: number;
  public offsetY: number;
  public sizeAxis: number;
  // tuple {x, y} width \ heigh canvas
  public size : Vec2;
  public mouse : Vec2 = new Vec2();

  set offsetXplus(val: number) { this.offsetX += val };
  set offsetYplus(val: number) { this.offsetY += val };

  set offsetXset(val: number) { this.offsetX = val };
  set offsetYset(val: number) { this.offsetY = val };

  set sizeAxisSet(val: number) { this.sizeAxis = val }
  get scaleNumGet() { return this.scale }
  get sizeGet() { return this.size}

  constructor(canvas: HTMLCanvasElement, scaleNum: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;

    this.offsetX = 0;
    this.offsetY = 0;
    this.sizeAxis = 20;

    this.size = new Vec2(Vec2.fromOffsetSize(this.canvas));

    this.widthGrap = 5;
    this.scale = scaleNum;

    this.centreGrap = 10;
  }


  public findIntersectionPoints(
    func1: (val: number) => number,
    func2: (val: number) => number,
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

  public clearCanvas() {
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

    mouse = mouse
      .cminus(size)
      .minus(this.offsetX, this.offsetY)
      .cdiv(this.scale)
      .minus(start)
      .times(this.scale)
      .plus(this.offsetX, this.offsetY)
  }

  public setSizeCanvas() {
    this.size = Vec2.fromOffsetSize(this.canvas);
    this.resetCanvas();
  }

  public resetCanvas() {
    this.drawAxis();
  }

  public graphDraawing( funcG2 : funG) {
    this.drawGraph(funcG2);
  }

}