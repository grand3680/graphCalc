import { type FC, DragEvent, useContext, useEffect, useState } from "react";
import styles from "./styles/graphMenu.module.scss";
import MyContext from "../MyContext";
import homeIcon from "../../icons/home.png";
import scalePlusIcon from "../../icons/scalePlus.png";
import scaleMinusIcon from "../../icons/scaleMinus.png";

import {
  handleAddInput,
  handleDeleteInput,
  handleInputChange,
} from "../graph/classes/handleInput";
import HighLightConverter from "./highLight";

const GraphComponent: FC = () => {
  const { graph: GraphInst } = useContext(MyContext);
  const [inputs, setInputs] = useState<Array<[string, boolean]>>([
    ["sin(x)", true],
    ["|x|", false],
    ["x = sin(y) + cos(y^2)", false],
    ["x = sin(y)", false],
  ]);
  const [_, setDebounceHandlers] = useState<number[]>([]);

  useEffect(() => {
    const newDebounceHandlers: number[] = [];
    inputs.forEach((input, index) => {
      const handler = setTimeout(() => {
        if (GraphInst) {
          GraphInst.formulaGraph(input[1] ? input[0] : "", index);
        }
      }, 500);
      newDebounceHandlers.push(handler);
    });

    // Set debounce handlers
    setDebounceHandlers(newDebounceHandlers);

    return () => {
      newDebounceHandlers.forEach((handler) => clearTimeout(handler));
    };
  }, [inputs, GraphInst, setDebounceHandlers]);

  const onClickHome = () => {
    if (!GraphInst) return;
    GraphInst.resetPos();
  };

  const onClickScale = (dY: number) => {
    if (!GraphInst) return;
    GraphInst.scaleClick(dY);
  };

  const handleAddInputClick = () => {
    handleAddInput(inputs, setInputs);
  };

  const handleDeleteInputClick = (index: number) => {
    if (!GraphInst) return;
    handleDeleteInput(index, inputs, setInputs, GraphInst);
  };
  const handleInputChangeValue = (index: number, value: string) => {
    handleInputChange(index, value, inputs, setInputs);
  };

  const handleDragStart = (index: number, e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (_: number, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const newInputs = [...inputs];
    const [draggedItem] = newInputs.splice(dragIndex, 1);
    newInputs.splice(index, 0, draggedItem);
    setInputs(newInputs);
  };

  const clickSettings = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index][1] = !newInputs[index][1];
    setInputs(newInputs);
  };

  return (
    <>
      <div
        className={styles.graphBlockInput}
      >
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputWrapper}>
            <div className={styles.inputBlock}>
              <div
                className={styles.inputHandler}
                draggable
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={(e) => handleDrop(index, e)}
              >
                <span className={styles.countFun}>{index + 1}</span>
                <button
                  className={
                    input[1] == true ? styles.activeGraph : styles.disabletGraph
                  }
                  onClick={() => clickSettings(index)}
                ></button>
              </div>
              <input
                className={styles.graphInput}
                value={input[0]}
                onChange={(e) => handleInputChangeValue(index, e.target.value)}
                type="text"
                placeholder={`Input ${index}`}
              />
            </div>
            <HighLightConverter expression={input[0]} />
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteInputClick(index)}
            >
              X
            </button>
          </div>
        ))}
        <button className={styles.addButton} onClick={handleAddInputClick}>
          Add
        </button>
      </div>
      <div className={styles.RightElement}>
        <button onClick={onClickHome} className={styles.HomePage}>
          <img src={homeIcon} alt="home" />
        </button>
        <div className={styles.scaleBlock}>
          <button
            className={styles.scalePage}
            onClick={() => onClickScale(-50)}
          >
            <img src={scalePlusIcon} alt="scalePlus" />
          </button>
          <button className={styles.scalePage} onClick={() => onClickScale(50)}>
            <img src={scaleMinusIcon} alt="sclaeMinus" />
          </button>
        </div>
      </div>
    </>
  );
};

export default GraphComponent;
