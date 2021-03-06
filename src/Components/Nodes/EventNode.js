import React, { memo, useState, useEffect } from 'react'
import { Handle } from 'react-flow-renderer'
import Emoji from 'Components/misc/Emoji'
import { EventNodeWrapper } from '../styles'
import { useSetRecoilState } from 'recoil'
import { ActiveNodeState, elementsState, isEditingState } from 'utils/store'
import { useCharacterHook, useNodeHook } from 'utils/hooks'

export default memo(({ id, data, ...props}) => {
  const { label, characters } = data
  // const {updateNode} = useNodeHook('event node')
  // if (characters?.length > 0) console.log(characters)
  const { getCharById } = useCharacterHook()
  const setEditing = useSetRecoilState(isEditingState)
  const handleEdit = () => {setEditing(wasEditing => !wasEditing)}
  const [presentCharList, setPresentCharList] = useState([])
  useEffect(()=> {
    if (characters?.length > 0) {
      let charIds = []
      for (const charId of characters) {
        // console.log(charId)
        charIds.push(getCharById(charId))
      }
      console.log(charIds, label, props)
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
      {presentCharList?.map((char) => {

        return <li key={char?.id}>
        <Emoji e={char?.emoji}/>
        <span> {char?.name}</span>
      </li>})}
    </ul>

  </div>
  <Handle
    type="source"
    position="right"
  />
</EventNodeWrapper>
});
