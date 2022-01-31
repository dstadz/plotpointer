import {useState, useEffect, useRef } from 'react'
import { elementsState, ActiveNodeState } from '../../utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from '../misc/Emoji';
import { useNodeHook } from 'utils/hooks/useNodeHook'
import { AddNodeFormWrapper } from './styles';

import {
  removeElements,
  useStoreState,
  useStoreActions
} from 'react-flow-renderer';


const AddNodeForm = () => {
  const [AddValue, setAddValue] = useState('')
  const [newChar, setNewChar] = useState('')
  const [newCharList, setNewCharList] = useState([])
  const [elements, setElements] = useRecoilState(elementsState)
  const { addNewNode, onConnect } = useNodeHook()
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
      const newNode = {
        storyId: 'drazen05',
        type: 'eventNode',
        position: {
          x: -1 * Math.floor(xPos) + 25,
          y: Math.floor(yPos) + 25
        },
        data: {
          label: AddValue,
          characters: newCharList
        },
      }
      addNewNode(newNode)
      setAddValue('')
      setNewCharList([])
    }


return <AddNodeFormWrapper>
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
</AddNodeFormWrapper>
};

export default AddNodeForm;