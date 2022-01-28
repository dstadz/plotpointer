import { AppWrapper } from './styles';
import TimeLine from './TimeLine/TimeLine';
import './App.css';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';
import Sidebar from './Components/Sidebar';


const App = () => {



return <AppWrapper>

{/* <Map /> */}
    <Sidebar />

  <TimeLine />

</AppWrapper>
}

export default App;
