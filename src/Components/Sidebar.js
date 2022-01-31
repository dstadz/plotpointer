import { useState , useEffect } from 'react'
import { SidebarWrapper } from './styles'
import { useStoreState } from 'react-flow-renderer'
import {
  AddNodeForm,
  EditNodeForm,
  AddCharForm
} from 'Components/Forms/'
import { useRecoilState, useRecoilValue } from 'recoil'
import { elementsState, isEditingState } from 'utils/store'
import { useStoryHook } from 'utils/hooks'

const Sidebar = () => {
  useStoryHook()
  const isEditing = useRecoilValue(isEditingState)
  const [isAddCharUp, setAddCharUp] = useState(false)
  const transform = useStoreState((store) => store.transform)

  const story1 = {
    userId: "daniel",
    title: "Reclamation Quest",
    lastTransform: [0,0,1]
  }

return <SidebarWrapper id='sidebar'>
  <AddNodeForm />

  {isAddCharUp
    ? <AddCharForm setAddCharUp={setAddCharUp}/>
    : <button onClick={()=> setAddCharUp(true)}> Add New Char </button>
  }

  {isEditing && <EditNodeForm />}

  <div className="title">
    pan transform [{transform[0].toFixed()}, {transform[1].toFixed()}]
  </div>
</SidebarWrapper>
}

export default Sidebar
