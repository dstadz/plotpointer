
import { removeElements } from 'react-flow-renderer';
import { elementsState } from '../utils/store'
import { useRecoilState } from 'recoil';
import EditNodeForm from './Nodes/EditNodeForm';
import AddNodeForm from './Nodes/AddNodeForm';
import { useNodeHook } from '../utils/hooks/useNodeHook';
import { SidebarWrapper } from './styles'


const Sidebar = () => {
  const [elements, setElements] = useRecoilState(elementsState);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }
  const { updateNode, onConnect } = useNodeHook()

return <SidebarWrapper>
  <AddNodeForm />
  <EditNodeForm />
</SidebarWrapper>
}

export default Sidebar;
