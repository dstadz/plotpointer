import {useState, useEffect, useRef } from 'react'
import { elementsState, ActiveNodeState } from '../utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from './misc/Emoji';
import { useNodeHook } from '../utils/hooks/useNodeHook'
import { AddNodeFormWrapper } from './styles';

const AddNodeForm = () => {
  const [AddValue, setAddValue] = useState('')
  const [elements, setElements] = useRecoilState(elementsState)

  const { addNewNode, onConnect } = useNodeHook()


  const handleAddChange = (e) => {
    e.preventDefault()
    setAddValue(e.target.value)
  }
  const handleAddSubmit = async (e) => {
    e.preventDefault()
      const newNode = {
        storyId: 'drazen05',
        type: 'eventNode',
        position: { x: 150, y: 150 },
        data: {
          label: AddValue,
          characters: []
        },
      }
      addNewNode(newNode)
      setAddValue('')
    }


return <AddNodeFormWrapper>
  <form onSubmit={handleAddSubmit}>
    <textarea
      value={AddValue}
      rows="5" cols="33"
      onChange={handleAddChange}
    />
    <button type='submit'>Add New Event<Emoji e={'✅'}/></button>
  </form>
</AddNodeFormWrapper>
};

export default AddNodeForm;
