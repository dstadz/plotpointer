import React, { memo, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Emoji from '../misc/Emoji'
import { EventNodeWrapper } from '../../TimeLine/styles'
import { useRecoilValue } from 'recoil'
import { ActiveNodeState, elementsState } from '../../utils/store'
import { useNodeHook } from '../../utils/hooks'

export default memo(({ id, data, isConnectable }) => {
  const activeNode = useRecoilValue(ActiveNodeState)
  const { updateNode, setAttribute } = useNodeHook()
  const [value, setValue] =useState('')

  const [isEditing, setEditing] = useState(false)

  const handleEdit = () => {
    setValue(data.label)
    setEditing(prev => !prev)
  }


  const handleChange = (e) => {
    setValue(e.target.value)
    }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(value)
    const isDifferent = data.label !== value
    if (isDifferent) {
        const freshNode = {
          ...activeNode,
          data: {"label": value},
        }
      // console.log('freshNode', {activeNode}, freshNode);
      updateNode(freshNode)
      setAttribute('label', value)
    }

    setEditing(false)
  }
  const handleX = () => { console.log('x')}

return <EventNodeWrapper>
  <Handle
    type="target"
    position="left"
    onConnect={(params) => console.log('handle onConnect', params)}
    isConnectable={isConnectable}
  />

  <div className="content">
  <nav>
    <button onClick={handleEdit}><Emoji e={'✏️'} /> </button>
    {/* <button onClick={handleX}> <Emoji e='❌' /></button> */}
  </nav>

  {isEditing
    ? <form>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleSubmit}><Emoji e={'✅'}/></button>
    </form>
    : <span>{data.label}</span>
    }


  </div>

  <Handle
    type="source"
    position="right"
    isConnectable={isConnectable}
  />
</EventNodeWrapper>
});
