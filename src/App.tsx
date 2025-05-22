import { type FC } from 'react';
import GraphComponnent from './components/graph/GraphComponnent';
import FooterGraph from './widgets/footer/ui';
import { MyProvider } from './components/MyContext';
import './styles/body.scss';
import './styles/app.scss';

export const App: FC = () => {
  return (
    <MyProvider>
      <div className="app">
        <GraphComponnent />
        <FooterGraph />
      </div>
    </MyProvider>
  );
};

export default App;
