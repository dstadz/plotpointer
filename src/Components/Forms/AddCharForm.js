import {useState, useEffect, useRef } from 'react'
import { elementsState, ActiveCharacterState } from 'utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from 'Components/misc/Emoji';
import { useCharacterHook } from 'utils/hooks'
import { AddCharacterFormWrapper } from '../styles';

import {
  removeElements,
  useStoreState,
  useStoreActions
} from 'react-flow-renderer';


const AddCharacterForm = () => {
  const [AddValue, setAddValue] = useState('')
  const [newChar, setNewChar] = useState('')
  const [newCharList, setNewCharList] = useState([])
  const [elements, setElements] = useRecoilState(elementsState)
  const { addNewCharacter, onConnect } = useCharacterHook()
  const [xPos, yPos, zoom] = useStoreState((store) => store.transform);


  const handleNewChar = (e) => {
    e.preventDefault()
    setNewCharList(prevList => [...prevList, newChar])
    setNewChar('')
  }


  const handleAddChange = (e) => {
    e.preventDefault()
    setAddValue(e.target.value)
  }
  const handleAddCharChange = (e) => {
    e.preventDefault()
    setNewChar(e.target.value)
  }
  const handleAddSubmit = async (e) => {
    e.preventDefault()
      const newCharacter = {
        storyId: 'drazen05',
        type: 'eventCharacter',
        position: {
          x: -1 * Math.floor(xPos) + 25,
          y: Math.floor(yPos) + 25
        },
        data: {
          label: AddValue,
          characters: newCharList
        },
      }
      addNewCharacter(newCharacter)
      setAddValue('')
      setNewCharList([])
    }


return <AddCharacterFormWrapper>
  <h3> Add Character </h3>
  <form onSubmit={handleAddSubmit}>
    <textarea
      value={AddValue}
      rows="5" cols="33"
      onChange={handleAddChange}
    />
    <input
      value={newChar}
      onChange={handleAddCharChange}

    />
    <button onClick={handleNewChar}><Emoji e={'➕'}/></button>
    {newCharList.map(char => <p key={char}>{char}</p>)}

    <br />
    <button type='submit'>Add New Event<Emoji e={'✅'}/></button>
  </form>
</AddCharacterFormWrapper>
};

export default AddCharacterForm;
