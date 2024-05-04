import { type FC, useContext, useEffect, useRef, useState } from "react";
import { graph } from "./classes/index";
import "./styles/graph.css";
import "./styles/index.css";
import MyContext from "../../components/MyContext";

import Menu from "../menuGraph/menu";

export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);
  const [width] = useState<number>(800);
  const [height] = useState<number>(800);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    var graph2 = new graph(canvas);
    updateContext(graph2);
  }, []);

  useEffect(() => {
    console.log(GraphInst);
    if (!GraphInst) return;

    window.addEventListener("wheel", (event) => {
      GraphInst.wheelEvent(event);
    });
  }, [GraphInst]);

  return (
    <>
      <div className="graphBlock">
        <Menu />
        <canvas width={width} height={height} ref={canvasRef} id="canvas" />
      </div>
    </>
  );
};

export default GraphComponnent;
