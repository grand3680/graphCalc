import { type FC, useContext, useEffect, useRef, useState } from "react";
import { graph } from "./classes/index";
import "./styles/graph.css";
import "./styles/index.css";
import MyContext from "../../components/MyContext";

import Menu from "../menuGraph/menu";

export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);
  const [width, setWidth] = useState<number>(window.innerWidth - 400);
  const [height, setHeight] = useState<number>(window.innerHeight);

  var mousedown = (e : any) => {
    if (!GraphInst) return;
    GraphInst.handleMouseDown(e);
  };
  var onMouseUp = () => {
    if (!GraphInst) return;
    GraphInst.handleMouseUp();
  };
  var onMouseMove = (e : any) => {
    if (!GraphInst) return;
    GraphInst.handleMouseMove(e);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    var graphInstan = new graph(canvas);
    updateContext(graphInstan);
  }, []);

  useEffect(() => {
    console.log(GraphInst);
    if (!GraphInst) return;

    window.addEventListener("wheel", (event) => {
      GraphInst.wheelEvent(event);
    });

    window.addEventListener("resize", () => {
      console.log(width, height, window.innerWidth);
      setWidth(window.innerWidth - 400);
      setHeight(window.innerHeight);
      GraphInst.setSizeCanvas();
    });
  }, [GraphInst]);

  return (
    <>
      <div className="graphBlock">
        <Menu />
        <canvas
          onMouseDown={(e) => mousedown(e)}
          onMouseUp={() => onMouseUp()}
          onMouseMove={(e) => onMouseMove(e)}
          width={width}
          height={height}
          ref={canvasRef}
          id="canvas"
        />
      </div>
    </>
  );
};

export default GraphComponnent;
