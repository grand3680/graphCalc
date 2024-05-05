import { graphDraw } from "./index";
import {minMax } from "../../../utils/mathCalc"

export class graph {
  public canvas: HTMLCanvasElement;
  public drawGraph: graphDraw;
  public colors: string[];
  public isDragging: boolean = false;

  public dragStartX: number = 0;
  public dragStartY: number = 0;

  public scale: number;
  public func: any[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.scale = 1;
    this.func = [new Function('x', 'return ' + "Math.tan(x)")];

    this.drawGraph = new graphDraw(this.canvas, this.scale)
    this.colors = ["#ff0000", "#D28F4C", "#F38E05"];

    this.drawGraph.resetCanvas();
  }

  public handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  };

  public handleMouseUp = () => this.isDragging = false;

  public handleMouseMove = (event: MouseEvent) => {
    if (this.isDragging) {
      const deltaX = event.clientX - this.dragStartX;
      const deltaY = event.clientY - this.dragStartY;

      this.drawGraph.offsetXset = -deltaX;
      this.drawGraph.offsetYset = -deltaY;
      this.start();

      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
    }
  };

  public wheelEvent(event: WheelEvent) {
    this.scale = minMax(this.scale - event.deltaY * this.scale * 0.001, .01, 100);

    this.drawGraph.scaleNumSet = this.scale;

    this.start();
  }

  public formulaGraph(val: string, indexInput: number) {
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
        .replace(/ctg/g, "1/Math.tan")
      var funcs = new Function('x', 'return ' + correctFormla);


      var checkFun = funcs(1);
      if (typeof checkFun !== "number") {
        throw new Error("Invalid function");
      }


      this.func[indexInput] = funcs
      

      this.start();
    } catch (error) {
      console.log(error);
    }
  }
  set funcSet(val: any[]) { this.func = val; }
  get funcGet() { return this.func }

  public setSizeCanvas() { this.drawGraph.setSizeCanvas(); }

  public start() {
    this.drawGraph.resetCanvas();
    for (var i = 0; i < this.func.length; i++) {
      this.drawGraph.graphDraawing(this.func[i], this.colors[i]);
    }
  }
}