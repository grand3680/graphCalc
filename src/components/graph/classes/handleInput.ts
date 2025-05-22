import { Dispatch, SetStateAction } from 'react';
import { graph } from './index';

type inputsT = Array<[string, boolean]>;

export const handleAddInput = (inputs: inputsT, setInputs: Dispatch<SetStateAction<inputsT>>) => {
  setInputs([...inputs, ['', true]]);
};

export const handleDeleteInput = (
  index: number,
  inputs: inputsT,
  setInputs: Dispatch<SetStateAction<inputsT>>,
  GraphInstance: graph,
) => {
  const newInputs = [...inputs];
  newInputs.splice(index, 1);
  if (GraphInstance) {
    const Allfunc = GraphInstance.funcGet;
    Allfunc.splice(index, 1);
    GraphInstance.funcSet = Allfunc;
    setInputs(newInputs);
  }
};

export const handleInputChange = (
  index: number,
  value: string,
  inputs: inputsT,
  setInputs: Dispatch<SetStateAction<inputsT>>,
) => {
  const newInputs = [...inputs];
  newInputs[index][0] = value;
  setInputs(newInputs);
};
