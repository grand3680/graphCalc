import { type FC } from "react";
import GraphFC from "./components/graph/GraphComponnent";
import FooterComponnent from "./components/footer/footer";
import { MyProvider } from "./components/MyContext";
import "./styles/body.scss"
import "./styles/app.scss"

export const App: FC = () => {
  return (
    <>
      <MyProvider>
        <div className="app">
          <GraphFC />
          <FooterComponnent/>
        </div>
      </MyProvider>
    </>
  );
};

export default App;
