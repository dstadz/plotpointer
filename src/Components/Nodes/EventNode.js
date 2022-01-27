import React, { memo, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Emoji from '../misc/Emoji'
import { EventNodeWrapper } from '../../TimeLine/styles'
import { useSetRecoilState } from 'recoil'
import { ActiveNodeState, elementsState, isEditingState } from '../../utils/store'

export default memo(({ id, data, isConnectable }) => {
  const setEditing = useSetRecoilState(isEditingState)
  const handleEdit = () => {setEditing(wasEditing => !wasEditing)}

return <EventNodeWrapper>
  <Handle
    type="target"
    position="left"
    onConnect={(params) => console.log('handle onConnect', params)}
    isConnectable={isConnectable}
  />
  <div className="node">
    <nav>
      <button onClick={handleEdit}><Emoji e={'✏️'} /> </button>
      {/* <button onClick={handleX}> <Emoji e='❌' /></button> */}
    </nav>
    <div className="inner-content">

      <span>{data.label}</span>
    </div>

  </div>
  <Handle
    type="source"
    position="right"
    isConnectable={isConnectable}
  />
</EventNodeWrapper>
});
