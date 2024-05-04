import { FC, PropsWithChildren, useState, createContext } from "react";
// import { graph } from "../components/graph/classes/index";
import { graph } from './graph/classes/index';

const MyContext = createContext<{
  graph :  graph | null,
  updateContext : (ClassInstance : graph) => void
}>({
  graph : null, 
  updateContext : () => {} 
});


export const MyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [graphInstance, setGraphClass] = useState<graph | null>(null);

  var updateContext = (ClassInstance: graph) => {
    setGraphClass(ClassInstance);
  };


  return (
    <MyContext.Provider value={{graph : graphInstance,  updateContext}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
