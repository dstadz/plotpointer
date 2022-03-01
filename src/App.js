import { AppWrapper } from './styles'
import Sidebar from 'Components/Sidebar'
import TimeLine from 'Components/TimeLine'
import 'react-flow-renderer/dist/style.css'
import 'react-flow-renderer/dist/theme-default.css'
import { ReactFlowProvider } from 'react-flow-renderer'

const App = () => {

return <ReactFlowProvider>
  <AppWrapper id="app">
    <Sidebar />
    <TimeLine />
  </AppWrapper>
</ReactFlowProvider>
}

export default App;
