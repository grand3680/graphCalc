import { type FC, useContext, useEffect, useRef } from "react";
import { graph } from "./classes/index";
import styles from "./styles/graph.module.scss";

import MyContext from "../MyContext";
import Menu from "../menuGraph/menu";

export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);

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
    if (!GraphInst) return;

    window.addEventListener("wheel", (event) => {
      GraphInst.wheelEvent(event);
    });

    window.addEventListener("resize", () => {
      if (!GraphInst) return;
      GraphInst.drawGraph.setSizeCanvas();
    });
  }, [GraphInst]);

  return (
    <>
      <div className={styles.graphBlock}>
        <Menu />
        <div className={styles.canvasBlock}>
          <canvas
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
