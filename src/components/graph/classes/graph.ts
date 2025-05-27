import { formulaReplace, graphDraw } from './index';
import { gamma, minMax } from '@/utils/mathCalc';
import { Vec2 } from '@/utils/vec2';

type TouchEventT = React.TouchEvent<HTMLCanvasElement>;
type MouseEventT = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export interface typeFuncT {
  typeFun: string;
  color: string;
  graphFormula: (...args: any[]) => number;
  indexFun: number;
}

export class graph {
  private canvas: HTMLCanvasElement;
  public drawGraph: graphDraw;
  private colors: string[] = [
    '#ff0000',
    '#D28F4C',
    '#3D8F4A',
    '#674AAA',
    '#FEFEFE',
    '#38BBBF',
    '#C773B9',
  ];
  private isDragging: boolean = false;

  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private initialDistance: number | null = 0;

  public funcs: typeFuncT[] | null[] = [null];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.drawGraph = new graphDraw(this.canvas);

    this.drawGraph.drawAxis();
  }

  public deleteByIndex(index: number): void {
    if (index >= 0 && index < this.funcs.length) {
      this.funcs.splice(index, 1);
      this.start();
    }
  }

  public resetPos() {
    const easingFactor = 0.1;
    let offsetX = this.drawGraph.offsetX;
    let offsetY = this.drawGraph.offsetY;

    if ((Math.abs(offsetX) < 0.1 && Math.abs(offsetY) < 0.1) || this.isDragging) return;

    const smoothResetPosition = () => {
      if (this.isDragging) {
        clearInterval(animationInterval);
        return;
      }
      offsetX -= offsetX * easingFactor;
      offsetY -= offsetY * easingFactor;

      this.drawGraph.offsetX = offsetX;
      this.drawGraph.offsetY = offsetY;

      // Check if offsets are close enough to zero to stop the animation
      if (Math.abs(offsetX) < 0.1 && Math.abs(offsetY) < 0.1) {
        this.drawGraph.offsetX = 0;
        this.drawGraph.offsetY = 0;
        clearInterval(animationInterval);
      }
      this.start();
    };
    const animationInterval = setInterval(smoothResetPosition, 16);
  }

  public getClientRect(event: MouseEventT | TouchEventT): [number, number] {
    if ('touches' in event) {
      return [event.touches[0].clientX, event.touches[0].clientY];
    }
    return [event.clientX, event.clientY];
  }

  public handleDragDown = (event: TouchEventT | MouseEventT) => {
    this.isDragging = true;
    const [clientX, clientY] = this.getClientRect(event);

    this.dragStartX = clientX;
    this.dragStartY = clientY;
  };

  public handleDragUp = () => (this.isDragging = false);

  public handleDragMove = (event: TouchEventT | MouseEventT) => {
    if (!this.isDragging) return;
    const [clientX, clientY] = this.getClientRect(event);
    if (!clientX || !clientY) return;

    const deltaX = clientX - this.dragStartX;
    const deltaY = clientY - this.dragStartY;

    this.drawGraph.offsetX += deltaX;
    this.drawGraph.offsetY += deltaY;
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
    this.drawGraph.toScale(this.calcScale(event.deltaY), this.vec2FromOffsetXY(event));

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
    const s = this.drawGraph.scale;

    const currentDistance = this.calculateDistance(event.touches[0], event.touches[1]);
    const scale = currentDistance / this.initialDistance;
    const adjustedScale = s * scale;

    this.drawGraph.toScale(adjustedScale, this.vec2FromOffsetXY(event));
    this.start();

    this.drawGraph.scale = adjustedScale;
  }

  public touchEnd(event: TouchEvent) {
    if (event.touches.length < 2) {
      this.initialDistance = null;
    }
  }

  public calcScale(dY: number): number {
    const s = this.drawGraph.scale;
    return minMax(s - dY * s * 0.001, 0.01, 100);
  }

  public scaleClick(dY: number) {
    let i = 5;

    const smoothScale = () => {
      i = i - 1;

      if (i <= 0) {
        clearInterval(animationInterval);
      }
      this.drawGraph.scale = this.calcScale(dY * i);
      this.start();
    };
    const animationInterval = setInterval(smoothScale, 16);
  }

  public formulaGraph(val: string, indexInput: number) {
    const [correctFormula, typeFunc] = formulaReplace(val);

    if (correctFormula == '') {
      this.funcs[indexInput] = null;
      this.start();
      return;
    }

    try {
      const envFun = {
        frac: gamma,
      };

      const funcsKey = [...Object.keys(envFun)];
      const funcsVal = [...Object.values(envFun)];

      const func: (typeFunc: number) => number = new Function(
        ...funcsKey,
        typeFunc == 'x' ? 'y' : 'x',
        'return ' + correctFormula,
      ).bind(null, ...funcsVal);

      const checkFunc = func(1);

      if (typeof checkFunc !== 'number') {
        this.funcs[indexInput] = null;
        throw new Error(`${func}, Invalid function`);
      }

      this.funcs[indexInput] = {
        typeFun: typeFunc,
        color: this.colors[indexInput] ?? '#33f',
        graphFormula: func,
        indexFun: indexInput,
      };
    } catch (error) {
      console.log(error);
    } finally {
      this.start();
    }
  }

  public start() {
    this.drawGraph.drawAxis();
    const funcses: typeFuncT[] = this.funcs.filter((el) => el !== null) as typeFuncT[];
    this.drawGraph.drawGraphFuns(funcses);
  }
}
