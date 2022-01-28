import {useState, useEffect, useRef } from 'react'
import { isEditingState, elementsState, ActiveNodeState } from '../utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from './misc/Emoji';
import { useNodeHook } from '../utils/hooks/useNodeHook'
import { EditNodeFormWrapper } from './styles';

const EditNodeForm = () => {
  const [editValue, setEditValue] = useState('')
  const activeNode = useRecoilValue(ActiveNodeState)
  const [elements, setElements] = useRecoilState(elementsState)
  const [isEditing, setEditing] = useRecoilState(isEditingState)

  const { updateNode, onConnect } = useNodeHook()

  const editFormRef = useRef()
  useEffect(() => {
    if (isEditing) {
      editFormRef.current.focus();
    }
  },[isEditing])

  useEffect(() => {
    if (isEditing) setEditValue(activeNode.data?.label || '' )
  },[isEditing, activeNode])


  const handleEditChange = (e) => {
    e.preventDefault()
    setEditValue(e.target.value)
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()
    const updatedNode = {
      ...activeNode,
      data : { label: editValue}
    }
    setElements((els) => els.map(el => {
      return el.id == activeNode.id ? updatedNode : el
    }))
    updateNode(updatedNode)
    setEditing(false)
  }


return isEditing ? <EditNodeFormWrapper>
  <form onSubmit={handleEditSubmit}>
    <textarea
      value={editValue}
      rows="5" cols="33"
      onChange={handleEditChange}
      ref={editFormRef}
    />
    <button type='submit'>Submit Edit<Emoji e={'✅'}/></button>
  </form>
</EditNodeFormWrapper> : null
};

export default EditNodeForm;
