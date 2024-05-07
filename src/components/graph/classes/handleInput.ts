import { Dispatch, SetStateAction } from "react";
import { graph } from "./index"

export const handleAddInput = (
  inputs: string[],
  setInputs: Dispatch<SetStateAction<string[]>>
) => {
  setInputs([...inputs, '']);
};

export const handleDeleteInput = (
  index: number,
  inputs: string[],
  setInputs: Dispatch<SetStateAction<string[]>>,
  GraphInstance: graph
) => {
  const newInputs = [...inputs];
  newInputs.splice(index, 1);
  if (GraphInstance) {
    var Allfunc = GraphInstance.funcGet;
    Allfunc.splice(index, 1);
    GraphInstance.funcSet = Allfunc;
    setInputs(newInputs);
  }
};

export const handleInputChange = (
  index: number,
  value: string,
  inputs: string[],
  setInputs: Dispatch<SetStateAction<string[]>>
) => {
  const newInputs = [...inputs];
  newInputs[index] = value;
  setInputs(newInputs);
};