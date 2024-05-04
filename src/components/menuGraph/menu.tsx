import { type FC, useContext, useEffect, useState } from "react";
import "./styles/graphMenu.css";
import useDebounce from "../../hooks/useDebounce";
import MyContext from "../../components/MyContext"

export const GraphComponnent: FC = () => {
  const {graph : GraphInst} = useContext(MyContext);
  const [inputTxt, setInputTxt] = useState<string>("");

  const debouncedGraphTerm = useDebounce(inputTxt, 500);

  
  useEffect(() => {
      if (debouncedGraphTerm) {
        if (!GraphInst) return;
        setInputTxt(debouncedGraphTerm);
        GraphInst.formulaGraph = debouncedGraphTerm;
      } else {
        setInputTxt("");
      }
    },
    [debouncedGraphTerm]
  );


  return (
    <>
      <div className="graphBlockInput">
        <input
          className="graphInput"
          onChange={(e) => setInputTxt(e.target.value)}
          type="text"
        />
      </div>
    </>
  );
};

export default GraphComponnent;
