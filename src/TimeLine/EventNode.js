import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';
import Emoji from '../utils/misc/Emoji';
import { EventNodeWrapper } from './styles';

export default memo(({ data, isConnectable }) => {
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
    console.log(data.label == value)

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
