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
    graphFormula: any // refactor
  }[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.funcs = [{
      "typeFun": "x",
      "color": "#ff0",
      "graphFormula": new Function('x', 'return ' + "x")
    }
    ];

    this.drawGraph = new graphDraw(this.canvas)
    this.colors = ["#ff0000", "#D28F4C", "#F38E05"];

    this.drawGraph.resetCanvas();
  }

  public resetPos() {
    this.drawGraph.offsetXset = 0;
    this.drawGraph.offsetYset = 0;
  }

  public handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  };

  public handleMouseUp = () => this.isDragging = false;

  public handleMouseMove = (event: MouseEvent) => {
    // this.drawGraph.mouseSet = Vec2.fromOffsetXY(event);
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
    var correctFormla: string = val;

    var typeFunc: string = "x";
    if (correctFormla.includes("=")) {
      const parts: string[] = correctFormla.split("=");
      typeFunc = parts[0].trim();
      correctFormla = parts[1].trim();
    }

    const replacements: { [key: string]: string } = {
      "pi": "Math.PI",
      "sin": "Math.sin",
      "arcsin": "Math.asin",
      "cos": "Math.cos",
      "arccos": "Math.acos",
      "abs": "Math.abs",
      "e": "Math.E",
      "\\^": "**",
      "tg": "Math.tan",
      "arctg": "Math.atan",
      "ctg": "1/Math.tan",
      "arcctg": "Math.PI / 2 - Math.atan",
      "ln": "Math.log",
      "log": "Math.log",
      "sqrt": "Math.sqrt"
    };

    for (const key in replacements) {
      if (Object.prototype.hasOwnProperty.call(replacements, key)) {
        const regexPattern: RegExp = new RegExp(`\\b${key}\\b`, "g");
        correctFormla = correctFormla.replace(regexPattern, replacements[key]);
      }
    }
    console.log(val, correctFormla);

    try {
      var func = new Function('x', 'return ' + correctFormla);

      var checkFun = func(1);
      if (typeof checkFun !== "number") {
        this.funcs[indexInput] = {
          typeFun: "x",
          color: "#ff0",
          graphFormula: null
        };
        throw new Error("Invalid function");
      }

      this.funcs[indexInput] = {
        typeFun: typeFunc,
        color: this.colors[indexInput] ?? '#33f',
        graphFormula: func
      }
    } catch (error) {
      console.log(error);
    } finally  {
      this.start();
    }
  }
  set funcSet(val: any[]) { this.funcs = val; }
  get funcGet() { return this.funcs }

  public start() {
    this.drawGraph.resetCanvas();
    for (var i = 0; i < this.funcs.length; i++) {
      if (this.funcs[i].graphFormula === null) continue;


      this.drawGraph.graphDraawing(this.funcs[i]);
    }
  }
}