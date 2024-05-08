import { graphDraw } from "./index";
import { minMax } from "../../../utils/mathCalc"
import { Vec2 } from "../../../utils/vec2";


export class graph {
  public canvas: HTMLCanvasElement;
  public drawGraph: graphDraw;
  public colors: string[];
  public isDragging: boolean = false;

  public dragStartX: number = 0;
  public dragStartY: number = 0;

  public funcs: {
    typeFun: string,
    color: string,
    graphFormula: any
    // funcGraph: (val: number) => number
  }[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.funcs = [{
      "typeFun": "x",
      "color": "#ff0",
      "graphFormula": new Function('x', 'return ' + "x")
    }
    ];

    this.drawGraph = new graphDraw(this.canvas, 1)
    this.colors = ["#ff0000", "#D28F4C", "#F38E05"];

    this.drawGraph.resetCanvas();
  }

  public handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  };

  public resetPos() {
    this.drawGraph.offsetXset = 0 - 200;
    this.drawGraph.offsetYset = 0;
  }

  set dragStartXSet(val: number) {
    this.dragStartX = val;
    this.drawGraph.offsetXset = val;

  }
  set dragStartYSet(val: number) {
    this.dragStartY = val;
    this.drawGraph.offsetYset = val;
  }

  public handleMouseUp = () => this.isDragging = false;

  public handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return
    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;

    this.drawGraph.offsetXplus = deltaX;
    this.drawGraph.offsetYplus = deltaY;
    this.start();

    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;

  };

  public wheelEvent(event: WheelEvent) {
    var scale = this.drawGraph.scaleNumGet;

    this.drawGraph.toScale(
      minMax(scale - event.deltaY * scale * 0.001, .01, 100),
      Vec2.fromOffsetXY(event)
    )

    this.start();
  }

  public formulaGraph(val: string, indexInput: number) {
    try {
      var correctFormla : string = val;

      var typeFunc: string = "x";
      if (correctFormla.includes("=")) {
        const parts: string[] = correctFormla.split("=");
        typeFunc = parts[0].trim();
        correctFormla = parts[1].trim();
      }

      const replacements: { [key: string]: string } = {
        "pi": "Math.PI",
        "sin": "Math.sin",
        "arcsin" : "Math.asin",
        "abs" : "Math.abs",
        "cos": "Math.cos",
        "arccos" : "Math.acos",
        "e": "Math.E",
        "\\^": "**",
        "tg": "Math.tan",
        "arctg" : "Math.atan",
        "ctg": "1/Math.tan",
        "arcctg" : "Math.PI / 2 - Math.atan",
        "ln": "Math.log",
        "log": "Math.log",
        "sqrt" : "Math.sqrt"

      };

      for (const key in replacements) {
        if (Object.prototype.hasOwnProperty.call(replacements, key)) {
          const regexPattern: RegExp = new RegExp(`\\b${key}\\b`, "g");
          correctFormla = correctFormla.replace(regexPattern, replacements[key]);
        }
      }

      var func = new Function('x', 'return ' + correctFormla);

      var checkFun = func(1);
      if (typeof checkFun !== "number") {
        this.funcs[indexInput] = {
          typeFun: "x",
          color: "#ff0",
          graphFormula: null
        };
        this.start();
        throw new Error("Invalid function");
      }

      this.funcs[indexInput] = {
        typeFun: typeFunc,
        color: this.colors[indexInput] ?? '#33f',
        graphFormula: func
      }

      this.start();
    } catch (error) {
      console.log(error);
    }
  }
  set funcSet(val: any[]) { this.funcs = val; }
  get funcGet() { return this.funcs }

  public setSizeCanvas() { this.drawGraph.setSizeCanvas(); }

  public start() {
    this.drawGraph.resetCanvas();
    for (var i = 0; i < this.funcs.length; i++) {
      if (this.funcs[i].graphFormula === null) continue;


      this.drawGraph.graphDraawing(this.funcs[i]);
    }
  }
}