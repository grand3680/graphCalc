import { type FC, useContext, useEffect, useRef } from "react";
import { graph } from "./classes/index";
import styles from "./styles/graph.module.scss";

import MyContext from "../MyContext";
import Menu from "../menuGraph/menu";

type TouchEventT = React.TouchEvent<HTMLCanvasElement>;
type MouseEventT = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);


  var onDragdown = (e: TouchEventT | MouseEventT) => {
    if (!GraphInst) return;
    GraphInst.handleDragDown(e);
  };
  var onDragUp = () => {
    if (!GraphInst) return;
    GraphInst.handleDragUp();
  };
  var onDragMove = (e: TouchEventT | MouseEventT) => {
    if (!GraphInst) return;
    GraphInst.handleDragMove(e);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    var graphInstan = new graph(canvas);
    updateContext(graphInstan);

    const onResize = () => {
      if (!GraphInst) return;
      GraphInst.drawGraph.setSizeCanvas();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
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
        <div className={styles.MenuBlock}>
          <Menu />
        </div>
        <div className={styles.canvasBlock}>
          <canvas
            onMouseDown={(e) => onDragdown(e)}
            onMouseUp={() => onDragUp()}
            onMouseMove={(e) => onDragMove(e)}
            onTouchStart={(e) => onDragdown(e)}
            onTouchEnd={() => onDragUp()}
            onTouchMove={(e) => onDragMove(e)}
            ref={canvasRef}
          />
        </div>
      </div>
    </>
  );
};

export default GraphComponnent;
