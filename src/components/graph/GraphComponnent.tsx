import { type FC, useContext, useEffect, useRef } from "react";
import { graph } from "./classes/index";
import styles from "./styles/graph.module.scss";

import MyContext from "../MyContext";
import Menu from "../menuGraph/menu";


export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);


  var onDragdown = (e: MouseEvent) => {
    if (!GraphInst) return;
    GraphInst.handleDragDown(e);
  };
  var onDragUp = () => {
    if (!GraphInst) return;
    GraphInst.handleDragUp();
  };
  var onDragMove = (e: MouseEvent) => {
    if (!GraphInst) return;
    GraphInst.handleDragMove(e);
  };

  var onTouchStart = (e: TouchEvent) => {
    if (!GraphInst) return;
    GraphInst.touchStart(e);
  };

  var onTouchMove = (e: TouchEvent) => {
    if (!GraphInst) return;
    GraphInst.touchMove(e);
  };
  
  var onTouchEnd = (e: TouchEvent) => {
    if (!GraphInst) return;
    GraphInst.touchEnd(e);
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

            onTouchStart={(e) => onTouchStart(e)}
            onTouchEnd={(e) => onTouchEnd(e)}
            onTouchMove={(e) => onTouchMove(e)}
            ref={canvasRef}
          />
        </div>
      </div>
    </>
  );
};

export default GraphComponnent;
