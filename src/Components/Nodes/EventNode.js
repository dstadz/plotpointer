import React, { memo, useState, useEffect } from 'react'
import { Handle } from 'react-flow-renderer'
import Emoji from 'Components/misc/Emoji'
import { EventNodeWrapper } from '../styles'
import { useSetRecoilState } from 'recoil'
import { ActiveNodeState, elementsState, isEditingState } from 'utils/store'
import { useCharacterHook, useNodeHook } from 'utils/hooks'

export default memo(({ id, data}) => {
  const { label, characters } = data
  const {updateNode} = useNodeHook()
  // if (characters?.length > 0) console.log(characters)
  const { getCharById } = useCharacterHook()
  const setEditing = useSetRecoilState(isEditingState)
  const handleEdit = () => {setEditing(wasEditing => !wasEditing)}
  const [presentCharList, setPresentCharList] = useState([])
  useEffect(()=> {
    if (characters?.length > 0) {
      let charIds = []
      for (const character of characters) {
        console.log(character)
        charIds.push(getCharById(character))
      }
      setPresentCharList(charIds)
    }
  },[])

  // console.log(presentCharList)
return <EventNodeWrapper>
  <Handle
    type="target"
    position="left"
    onConnect={(params) => console.log('handle onConnect', params)}
  />
  <div className="node">

    <nav>
      <span className="node-id">{id}</span>
      <button onClick={handleEdit}><Emoji e={'✏️'} /> </button>
    </nav>

    <div className="inner-content">
      <span>{label}</span>
    </div>

    <ul>
      {presentCharList?.map((char) => <li key={char.id}>
        <Emoji e={char.emoji}/>
        <span> {char.name}</span>
      </li>)}
    </ul>

  </div>
  <Handle
    type="source"
    position="right"
  />
</EventNodeWrapper>
});
