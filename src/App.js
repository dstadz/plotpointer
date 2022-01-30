import { AppWrapper } from './styles';
import TimeLine from './TimeLine/TimeLine';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';
import Sidebar from './Components/Sidebar';
import { ReactFlowProvider } from 'react-flow-renderer';

const App = () => {

return <AppWrapper id="app">
  <ReactFlowProvider>
    <Sidebar />
    <TimeLine />
  </ReactFlowProvider>
</AppWrapper>
}

export default App;
