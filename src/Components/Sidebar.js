import { useState , useEffect } from 'react'
import { SidebarWrapper } from './styles'
import { useStoreState } from 'react-flow-renderer'
import {
  AddNodeForm,
  EditNodeForm,
  AddCharForm
} from 'Components/Forms/'
import { useRecoilState, useRecoilValue } from 'recoil'
import Emoji from './misc/Emoji'
import { elementsState, isEditingState, allCharacterListState } from 'utils/store'
import { useStoryHook,  useCharacterHook } from 'utils/hooks'

const Sidebar = () => {
  // useStoryHook()
  useCharacterHook()
  const characters = useRecoilValue(allCharacterListState)
  const isEditing = useRecoilValue(isEditingState)
  const [isAddCharUp, setAddCharUp] = useState(false)
  const transform = useStoreState((store) => store.transform)
return <SidebarWrapper id='sidebar'>
  <AddNodeForm />

  {isAddCharUp
    ? <AddCharForm setAddCharUp={setAddCharUp}/>
    : <button onClick={()=> setAddCharUp(true)}> Add New Char </button>
  }
  <div>
  {characters.map(char => <Emoji key={char.name} e={char.emoji} />)}
  </div>
  {isEditing && <EditNodeForm />}

  <div className="title">
    pan transform [{transform[0].toFixed()}, {transform[1].toFixed()}]
  </div>
</SidebarWrapper>
}

export default Sidebar
