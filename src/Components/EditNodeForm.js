import {useState, useEffect, useRef } from 'react'
import { isEditingState, elementsState, ActiveNodeState } from '../utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from './misc/Emoji';
import { useNodeHook } from '../utils/hooks/useNodeHook'
import { EditNodeFormWrapper } from './styles';
import { getIncomers } from 'react-flow-renderer';

const EditNodeForm = () => {
  const activeNode = useRecoilValue(ActiveNodeState)
  const [editValue, setEditValue] = useState('')
  const [elements, setElements] = useRecoilState(elementsState)
  const [isEditing, setEditing] = useRecoilState(isEditingState)
  const [potentialChars, setPotentialCharacters] = useState([])

  const { updateNode, onConnect } = useNodeHook()

  const editFormRef = useRef()
  useEffect(() => isEditing && editFormRef.current.focus() ,[isEditing])

  useEffect(() => {
    if (isEditing) setEditValue(activeNode.data?.label || '' )
    const prevNodes = getIncomers(activeNode, elements)

    const poChars = []
    for (const node of prevNodes) {
      console.log(node?.data?.characters)
      poChars.push(...node.data.characters)
    }
    setPotentialCharacters(poChars)


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


console.log (potentialChars)
return isEditing && <EditNodeFormWrapper>
  <form onSubmit={handleEditSubmit}>
    <textarea
      value={editValue}
      rows="5" cols="33"
      onChange={handleEditChange}
      ref={editFormRef}
    />
    <button type='submit'>Submit Edit<Emoji e={'✅'}/></button>
  </form>

  <ul>
    {potentialChars.map((char) => <li key={char}>{char}</li>)}
  </ul>

</EditNodeFormWrapper>
};

export default EditNodeForm;
