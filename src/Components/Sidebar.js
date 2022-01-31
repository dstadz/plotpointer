
import { elementsState, isEditingState } from '../utils/store'
import { useRecoilState, useRecoilValue } from 'recoil';
import EditNodeForm from './Nodes/EditNodeForm';
import AddNodeForm from './Nodes/AddNodeForm';
import { useNodeHook } from '../utils/hooks/useNodeHook';
import { SidebarWrapper } from './styles'

import {
  removeElements,
  useStoreState,
  useStoreActions
} from 'react-flow-renderer';



const storyInstance = {
  storyId: '',
  lastTransform: [0,0]
}





const Sidebar = () => {
  const isEditing = useRecoilValue(isEditingState)
  const nodes = useStoreState((store) => store.nodes);
  const transform = useStoreState((store) => store.transform);
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

  const selectAll = () => {
    setSelectedElements(nodes.map((node) => ({ id: node.id, type: node.type })));
  };





  const [elements, setElements] = useRecoilState(elementsState);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }
  const { updateNode, onConnect } = useNodeHook()

return <SidebarWrapper id='sidebar'>
  <AddNodeForm />
  {isEditing && <EditNodeForm />}


  <div className="title">Zoom & pan transform</div>
  <div className="transform">
    [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
  </div>
  {/* <div className="title">Nodes</div>
  {nodes.map((node) => (
    <div key={node.id}>
      Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)}
    </div>
  ))} */}

  <div className="selectall">
    <button onClick={selectAll}>select all nodes</button>
  </div>


</SidebarWrapper>
}

export default Sidebar;
