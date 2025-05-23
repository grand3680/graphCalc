import { type FC, DragEvent, useContext, useEffect, useState } from 'react';
import styles from './styles/graphMenu.module.scss';
import MyContext from '../MyContext';

import { handleAddInput, handleDeleteInput, handleInputChange } from '../graph/classes/handleInput';
import HighLightConverter from './highLight';
import clsx from 'clsx';

const AsideComponent: FC = () => {
  const { graph: GraphInst } = useContext(MyContext);
  const [inputs, setInputs] = useState<Array<[string, boolean]>>([
    ['sin(x)', true],
    ['|x|', false],
    ['x = sin(y)+cos(y)', false],
    ['x = sin(y)', false],
  ]);
  const [_, setDebounceHandlers] = useState<number[]>([]);

  useEffect(() => {
    const newDebounceHandlers: number[] = [];
    inputs.forEach((input, index) => {
      const handler = setTimeout(() => {
        if (GraphInst) {
          GraphInst.formulaGraph(input[1] ? input[0] : '', index);
        }
      }, 250);
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

  const handleDragStart = (index: number, e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (_: number, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
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
    <aside className={clsx(styles.graphBlockInput, styles.MenuBlock)}>
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
                className={input[1] ? styles.activeGraph : styles.disabletGraph}
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
          <button className={styles.deleteButton} onClick={() => handleDeleteInputClick(index)}>
            X
          </button>
        </div>
      ))}
      <button className={styles.addButton} onClick={handleAddInputClick}>
        Add
      </button>
    </aside>
  );
};

export default AsideComponent;
