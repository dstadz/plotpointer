import logo from './logo.svg';
import './App.css';
import { AppWrapper } from './styles';
import TimeLine from './TimeLine/TimeLine';
import DnDFlow from './TimeLine/DnDFlow';
import Sidebar from './TimeLine/SideBar';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';
import OverviewFlow from './TimeLine/overview';

const App = () => {



  return <AppWrapper>
    <TimeLine />

  </AppWrapper>
}

export default App;
