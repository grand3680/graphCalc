import { type FC } from "react";
import GraphFC from "./components/graph/GraphComponnent";
import { MyProvider } from "./components/MyContext";
import "./styles/body.scss"

export const App: FC = () => {
  return (
    <>
      <MyProvider>
        <GraphFC />
      </MyProvider>
    </>
  );
};

export default App;
