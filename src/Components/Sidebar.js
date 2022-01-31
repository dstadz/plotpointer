import { useState , useEffect } from 'react'
import { SidebarWrapper } from './styles'
import {
  useStoreState,
  useStoreActions
} from 'react-flow-renderer'
import {
  AddNodeForm,
  EditNodeForm,
  AddCharForm
} from 'Components/Forms/'
import { useRecoilState, useRecoilValue } from 'recoil'
import { elementsState, isEditingState } from 'utils/store'

const storyInstance = {
  storyId: '',
  lastTransform: [0,0]
}

const Sidebar = () => {
  const isEditing = useRecoilValue(isEditingState)
  const [isAddCharUp, setAddCharUp] = useState(false)
  const nodes = useStoreState((store) => store.nodes)
  const transform = useStoreState((store) => store.transform)
  const [elements, setElements] = useRecoilState(elementsState)
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements)

  const selectAll = () => {
    setSelectedElements(nodes.map((node) => ({ id: node.id, type: node.type })));
  };

  useEffect(() => {
    const updateLastWindowPos = () => {
      // do your cleanup
    }
    window.addEventListener('beforeunload', updateLastWindowPos);
    return () => { window.removeEventListener('beforeunload', updateLastWindowPos) }
  }, []);

return <SidebarWrapper id='sidebar'>
  <AddNodeForm />

  {isAddCharUp
    ? <AddCharForm setAddCharUp={setAddCharUp}/>
    : <button onClick={()=> setAddCharUp(true)}> Add New Char </button>
  }

  {isEditing && <EditNodeForm />}

  <div className="title">
    pan transform
    [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}]
  </div>

  <div className="selectall">
    <button onClick={selectAll}>select all nodes</button>
  </div>

</SidebarWrapper>
}

export default Sidebar
