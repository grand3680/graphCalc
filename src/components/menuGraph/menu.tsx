import { type FC, useContext, useEffect, useState } from "react";
import styles from "./styles/graphMenu.module.scss";
import MyContext from "../MyContext";


import {
  handleAddInput,
  handleDeleteInput,
  handleInputChange,
} from "../graph/classes/handleInput";
import HighLightConverter from "./highLight";

export const GraphComponent: FC = () => {
  const { graph: GraphInst } = useContext(MyContext);
  const [inputs, setInputs] = useState<string[]>(["sin(x)"]);
  const [_, setDebounceHandlers] = useState<number[]>([]);

  useEffect(() => {
    const newDebounceHandlers: number[] = [];
    inputs.forEach((input, index) => {
      const handler = setTimeout(() => {
        if (GraphInst) {
          GraphInst.formulaGraph(input, index);
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
  const onClickHome = () => {
    if (!GraphInst) return;
    GraphInst.resetPos();
    GraphInst.start();
  }

  return (
    <>
      <div className={styles.graphBlockInput}>
        {inputs.map((input, index) => (
          <div className={styles.inputWrapper} key={index}>
            <input
              className={styles.graphInput}
              value={input}
              onChange={(e) => handleInputChangeValue(index, e.target.value)}
              type="text"
              placeholder={`Input ${index}`}
            />
            <HighLightConverter expression={input} />
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
      <button onClick={onClickHome} className={styles.HomePage}>X</button>
    </>
  );
};
export default GraphComponent;
