import { type FC, useContext, useEffect, useState } from "react";
import styles from "./styles/graphMenu.module.scss";
import MyContext from "../../components/MyContext";

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

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleDeleteInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    if (GraphInst) {
      var Allfunc = GraphInst.funcGet;
      Allfunc.splice(index, 1);
      GraphInst.funcSet = Allfunc;
      setInputs(newInputs);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <>
      <div className={styles.graphBlockInput}>
        {inputs.map((input, index) => (
          <div className={styles.inputWrapper} key={index}>
            <input
              className={styles.graphInput}
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              type="text"
              placeholder={`Input ${index}`}
            />
            <button className={styles.deleteButton} onClick={() => handleDeleteInput(index)}>Delete</button>
          </div>
        ))}
        <button className={styles.addButton} onClick={handleAddInput}>Add</button>
      </div>
    </>
  );
};
export default GraphComponent;
