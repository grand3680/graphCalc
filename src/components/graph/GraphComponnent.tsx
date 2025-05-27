import { type FC, useContext, useEffect, useRef } from 'react';
import { graph } from './classes/index';
import styles from './styles/graph.module.scss';

import MyContext from '../MyContext';
import Menu from '../menuGraph/menu';
import RightMenu from '../menuGraph/rightMenu';

type TouchEventT = React.TouchEvent<HTMLCanvasElement>;
type MouseEventT = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export const GraphComponnent: FC = () => {
  const canvasRef = useRef(null);
  const { graph: GraphInst, updateContext } = useContext(MyContext);

  const onDragdown = (e: TouchEventT | MouseEventT) => {
    if (!GraphInst) return;
    GraphInst.handleDragDown(e);
  };
  const onDragUp = () => {
    if (!GraphInst) return;
    GraphInst.handleDragUp();
  };
  const onDragMove = (e: TouchEventT | MouseEventT) => {
    if (!GraphInst) return;
    GraphInst.handleDragMove(e);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const graphInstance = new graph(canvas);
    updateContext(graphInstance);
  }, []);

  useEffect(() => {
    if (!GraphInst) return;

    const onWheel = (event: WheelEvent) => {
      GraphInst.wheelEvent(event);
    };

    let resizeTimeout: NodeJS.Timeout | undefined;

    const onResize = () => {
      GraphInst.drawGraph.setSizeCanvas();

      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        GraphInst.start();
      }, 100);
    };

    window.addEventListener('wheel', onWheel);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
    };
  }, [GraphInst]);

  return (
    <main className={styles.graph}>
      <Menu />
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
      {GraphInst && <RightMenu GraphInst={GraphInst} />}
    </main>
  );
};

export default GraphComponnent;
