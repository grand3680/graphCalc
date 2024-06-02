import { formulaReplace, graphDraw } from "./index";
import { gamma, minMax } from "../../../utils/mathCalc"
import { Vec2 } from "../../../utils/vec2";

type TouchEventT = React.TouchEvent<HTMLCanvasElement>;
type MouseEventT = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

interface typeFuncT {
  typeFun: string,
  color: string,
  graphFormula: any,
  indexFun : number,
}

export class graph {
  public canvas: HTMLCanvasElement;
  public drawGraph: graphDraw;
  public colors: string[];
  public isDragging: boolean = false;

  public dragStartX: number = 0;
  public dragStartY: number = 0;
  private initialDistance: number | null = 0;

  public funcs: typeFuncT[] | null[] = [null];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.drawGraph = new graphDraw(this.canvas)
    this.colors = ["#ff0000", "#D28F4C", "#3D8F4A", "#674AAA", "#FEFEFE", "#38BBBF", "#C773B9"];

    this.drawGraph.drawAxis();
  }

  public resetPos() {
    const easingFactor = 0.1;
    var offsetX: number = this.drawGraph.offsetXget;
    var offsetY: number = this.drawGraph.offsetYget;

    if ((Math.abs(offsetX) < 0.1 && Math.abs(offsetY) < 0.1) || this.isDragging) return;


    var smoothResetPosition = () => {
      if (this.isDragging) {
        clearInterval(animationInterval);
        return
      }
      offsetX -= offsetX * easingFactor;
      offsetY -= offsetY * easingFactor;

      this.drawGraph.offsetXset = offsetX;
      this.drawGraph.offsetYset = offsetY;

      // Check if offsets are close enough to zero to stop the animation
      if (Math.abs(offsetX) < 0.1 && Math.abs(offsetY) < 0.1) {
        this.drawGraph.offsetXset = 0;
        this.drawGraph.offsetYset = 0;
        clearInterval(animationInterval);
      }
      this.start();
    }
    const animationInterval = setInterval(smoothResetPosition, 16);
  }

  public getClientRect(event: MouseEventT | TouchEventT): [any, any] {
    let clientX: number | null = null;
    let clientY: number | null = null;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return [clientX, clientY];
  }


  public handleDragDown = (event: TouchEventT | MouseEventT) => {
    this.isDragging = true;
    var [clientX, clientY] = this.getClientRect(event);
    if (!clientX || !clientY) return;

    this.dragStartX = clientX;
    this.dragStartY = clientY;
  };

  public handleDragUp = () => this.isDragging = false;

  public handleDragMove = (event: TouchEventT | MouseEventT) => {
    if (!this.isDragging) return;
    var [clientX, clientY] = this.getClientRect(event);

    if (!clientX || !clientY) return;
    // this.drawGraph.mouseSet = Vec2.fromOffsetXY(touch);

    const deltaX = clientX - this.dragStartX;
    const deltaY = clientY - this.dragStartY;

    this.drawGraph.offsetXplus = deltaX;
    this.drawGraph.offsetYplus = deltaY;
    this.start();

    this.dragStartX = clientX;
    this.dragStartY = clientY;
  };

  private vec2FromOffsetXY(event: WheelEvent | TouchEvent): Vec2 {
    const x = 'offsetX' in event ? event.offsetX : event.touches[0].clientX;
    const y = 'offsetY' in event ? event.offsetY : event.touches[0].clientY;
    return Vec2.fromOffsetXY({ offsetX: x, offsetY: y });
  }


  public wheelEvent(event: WheelEvent) {
    this.drawGraph.toScale(
      this.calcScale(event.deltaY),
      this.vec2FromOffsetXY(event)
      // Vec2.fromOffsetXY(event)
    )

    this.start();
  }


  private calculateDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public touchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      this.initialDistance = this.calculateDistance(event.touches[0], event.touches[1]);
    }
  }

  public touchMove(event: TouchEvent) {
    if (event.touches.length !== 2 || !this.initialDistance) return;
    var s = this.drawGraph.scaleNumGet;

    const currentDistance = this.calculateDistance(event.touches[0], event.touches[1]);
    const scale = currentDistance / this.initialDistance;
    const adjustedScale = s * scale;

    this.drawGraph.toScale(adjustedScale, this.vec2FromOffsetXY(event));
    this.start();

    this.drawGraph.scaleeNumSet = adjustedScale;
  }

  public touchEnd(event: TouchEvent) {
    if (event.touches.length < 2) {
      this.initialDistance = null;
    }
  }


  public calcScale(dY: number): number {
    var s = this.drawGraph.scaleNumGet;
    return minMax(s - dY * s * 0.001, .01, 100)
  }

  public scaleClick(dY: number) {
    var i = 5;

    var smoothScale = () => {
      i = i - 1;

      if (i <= 0) {
        clearInterval(animationInterval);
      }
      this.drawGraph.scaleeNumSet = this.calcScale(dY * i);
      this.start();
    }
    const animationInterval = setInterval(smoothScale, 16);
  }



  public formulaGraph(val: string, indexInput: number) {
    var [correctFormla, typeFunc]: string[] = formulaReplace(val);

    try {
      const envFun = {
        frac: gamma
      };

      var funcsKey = [...Object.keys(envFun)]
      var funcsVal = [...Object.values(envFun)]

      var func = new Function(...funcsKey, typeFunc == "x" ? "y" : "x", 'return ' + correctFormla).bind(null, ...funcsVal);

      var checkFunc = func(1);

      if (typeof checkFunc !== "number") {
        this.funcs[indexInput] = null;
        throw new Error("Invalid function");
      }

      this.funcs[indexInput] = {
        typeFun: typeFunc,
        color: this.colors[indexInput] ?? '#33f',
        graphFormula: func,
        indexFun : indexInput
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.start();
    }
  }
  set funcSet(val: any[]) { this.funcs = val; }
  get funcGet() { return this.funcs }

  public start() {
    this.drawGraph.drawAxis();
    let funcses = this.funcs.filter(el => el !== null);
    this.drawGraph.drawGraphFuns(funcses);
  }
}