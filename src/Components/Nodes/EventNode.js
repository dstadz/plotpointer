import React, { memo, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Emoji from 'Components/misc/Emoji'
import { EventNodeWrapper } from './styles'
import { useSetRecoilState } from 'recoil'
import { ActiveNodeState, elementsState, isEditingState } from 'utils/store'

export default memo(({ id, data}) => {
  const { label, characters } = data
  const setEditing = useSetRecoilState(isEditingState)
  const handleEdit = () => {setEditing(wasEditing => !wasEditing)}

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
        {characters?.map((char) => <li key={char}>{char}</li>)}
      </ul>

  </div>
  <Handle
    type="source"
    position="right"
  />
</EventNodeWrapper>
});
