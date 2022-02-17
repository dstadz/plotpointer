import {useState, useEffect, useRef } from 'react'
import { isEditingState, elementsState, ActiveNodeState } from 'utils/store'
import { useRecoilState, useRecoilValue } from 'recoil';
import Emoji from 'Components/misc/Emoji';
import { useNodeHook } from 'utils/hooks'
import { EditNodeFormWrapper } from '../styles';
import { getIncomers } from 'react-flow-renderer';
import { useCharacterHook } from '../../utils/hooks/useCharacterHook';

export const EditNodeForm = () => {
  const editFormRef = useRef()
  const { updateNode } = useNodeHook()
  const { allCharacterList } = useCharacterHook()
  const [editValue, setEditValue] = useState('')
  const activeNode = useRecoilValue(ActiveNodeState)
  const [activeChars, setActiveChars] = useState([])
  const [elements, setElements] = useRecoilState(elementsState)
  const [isEditing, setEditing] = useRecoilState(isEditingState)
  // const [isNewCharsUp, setNewCharsUp] = useState(true)
  useEffect(() => isEditing && editFormRef.current.focus(), [isEditing])
  const poChars = []

  useEffect(() => {
    if (isEditing) setEditValue(activeNode.data?.label || '' )
    const prevNodes = getIncomers(activeNode, elements)
    for (let char of allCharacterList) {
      const { name } = char
    //  setCharSelectedList (csList => {
    //     const newList = ({...csList, [name]: activeNode.data.characters.includes(name)})
    //     return newList
    //   })
    }
    // for (const node of prevNodes) {
    //   console.log(node?.data?.characters)
    //   poChars.push(...node.data.characters)
    // }
    // setCharSelectedList(poChars)


  },[isEditing, activeNode])


  const handleEditChange = (e) => {
    e.preventDefault()
    setEditValue(e.target.value)
  }



  const handleCharListChange = (e,char, isAdding=false) => {
    e.preventDefault()
    isAdding
      ? setActiveChars(prevChars => [...prevChars, char])
      : setActiveChars(prevChars => prevChars.filter(prev => prev.id !== char.id ))
  }


  const handleEditSubmit = (e) => {
    e.preventDefault()
    const charIdList = activeChars.map(char => char.id)
    console.log(charIdList)
    const updatedNode = {
      ...activeNode,
      data : {
        characters: charIdList,
        label: editValue
      }
    }
    console.log(updatedNode)
    setElements((els) => els.map(el => {
      return el.id == activeNode.id ? updatedNode : el
    }))
    updateNode(updatedNode)
    setEditing(false)
  }

// console.log(allCharacterList)
return <EditNodeFormWrapper>
  <h3> Edit Event</h3>

  <form onSubmit={handleEditSubmit}>
    <textarea
      value={editValue}
      rows="5" cols="33"
      onChange={handleEditChange}
      ref={editFormRef}
    />

  <p> Characters included: </p>
  <ul>
    {activeChars.map((char) => <CharSlot
      key={char.id}
      character={char}
      handler={(e)=>{handleCharListChange(e,char)}}
    />)}
  </ul>

  {/* <button onClick={()=> setNewCharsUp(wasUp => !wasUp)}>Add Character</button> */}

  <p> Add New Character </p>
  <ul>
    {allCharacterList.map(char=> <CharSlot
      key={char.id}
      character={char}
      handler={(e)=>{handleCharListChange(e,char, true)}}
      isAdding={true}
    />)}
  </ul>

    <button type='submit'>Submit Edit<Emoji e={'✅'}/></button>
  </form>

</EditNodeFormWrapper>
}


const CharSlot = ({ character, handler, isAdding=false }) => {
  // console.log(character)
  return <li>
    {isAdding && <button onClick={handler}> + </button>}
    <span>{ character.name }</span>
    <Emoji e={character.emoji} />

    {!isAdding && <button onClick={handler}> X </button>}
  </li>
}
