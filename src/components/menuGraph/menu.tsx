import { type FC, DragEvent, useContext, useEffect, useState } from 'react';
import styles from './styles/graphMenu.module.scss';
import MyContext from '../MyContext';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { handleAddInput, handleDeleteInput, handleInputChange } from '../graph/classes/handleInput';
import clsx from 'clsx';

type inputArrayType = Array<[string, boolean]>;

const defaultFormulas: inputArrayType = [
  ['sin(x)', true],
  ['|x|', false],
  ['x = sin(y)+cos(y)', false],
  ['x = sin(y)', false],
];

const AsideComponent: FC = () => {
  const { graph: GraphInst } = useContext(MyContext);
  const [inputs, setInputs] = useState<inputArrayType>(defaultFormulas);
  const [_, setDebounceHandlers] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const newDebounceHandlers: NodeJS.Timeout[] = [];
    inputs.forEach((input, index) => {
      const handler: NodeJS.Timeout = setTimeout(() => {
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

  const handleDeleteInputClick = (index: number) => {
    if (!GraphInst) return;
    handleDeleteInput(index, inputs, setInputs, GraphInst);
  };
  const handleInputChangeValue = (index: number, value: string) => {
    handleInputChange(index, value, inputs, setInputs);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...inputs];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setInputs(reordered);
  };

  const clickSettings = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index][1] = !newInputs[index][1];
    setInputs(newInputs);
  };

  return (
    <aside className={clsx(styles.graphBlockInput, styles.MenuBlock)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="inputs" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {inputs.map((input, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={styles.inputWrapper}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        ...(snapshot.isDragging
                          ? {
                              transform: `translate(0px, ${provided.draggableProps.style?.transform?.match(/translate\((?:[^,]+),\s*([^)]*)\)/)?.[1] ?? '0px'})`,
                            }
                          : {}),
                      }}
                    >
                      <div className={styles.inputBlock}>
                        <div className={styles.inputHandler}>
                          <span className={styles.countFun}>{index + 1}</span>
                          <button
                            className={
                              input[1] ? styles.activeGraph : styles.disabletGraph
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
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteInputClick(index)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className={styles.addButton} onClick={() => handleAddInput(inputs, setInputs)}>
        Add
      </button>
    </aside>
  );
};

export default AsideComponent;
