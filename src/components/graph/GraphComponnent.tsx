import { type FC, useContext, useEffect, useRef, useState } from "react";
import { graph } from "./classes/index";
import styles from "./styles/graph.module.scss";

import MyContext from "../../components/MyContext";

import Menu from "../menuGraph/menu";

export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  var mousedown = (e: any) => {
    if (!GraphInst) return;
    GraphInst.handleMouseDown(e);
  };
  var onMouseUp = () => {
    if (!GraphInst) return;
    GraphInst.handleMouseUp();
  };
  var onMouseMove = (e: any) => {
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
      if (!GraphInst) return;
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      GraphInst.setSizeCanvas();
    });
  }, [GraphInst]);

  return (
    <>
      <div className={styles.graphBlock}>
        <Menu />
        <div className={styles.canvasBlock}>
          <canvas
            className={styles.CanvasEl}
            width={width}
            height={height}
            onMouseDown={(e) => mousedown(e)}
            onMouseUp={() => onMouseUp()}
            onMouseMove={(e) => onMouseMove(e)}
            ref={canvasRef}
          />          
        </div>

      </div>
    </>
  );
};

export default GraphComponnent;
