import {useState, useEffect} from 'react'
import { addToFirebase } from '../utils/firebase'
import {collection, query } from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { isEditingState, elementsState, ActiveNodeState } from '../utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from './misc/Emoji';
import { useNodeHook } from '../utils/hooks/useNodeHook'



const Sidebar = () => {
  const [isEditing, setEditing] = useRecoilState(isEditingState)
  const setElements = useSetRecoilState(elementsState);
  const activeNode = useRecoilValue(ActiveNodeState);
  const [addValue, setAddValue] = useState('')
  const [editValue, setEditValue] = useState('')

  const { updateNode, onConnect } = useNodeHook()


const onElementsRemove = (elementsToRemove) =>{
  setElements((els) => removeElements(elementsToRemove, els));
  }


  useEffect(() => {
    console.log(activeNode)
    if (isEditing) setEditValue(activeNode.data.label)
  },[isEditing, activeNode])

  const handleAddChange = (e) => {
    setAddValue(e.target.value)
    }



  const handleEditChange = (e) => {
    e.preventDefault()
    setEditValue(e.target.value)
  }


  const handleAddSubmit = async () => {
    // e.preventDefault()
      const newNode = {
        type: 'eventNode',
        position: { x: 150, y: 150 },
        data: {
          label: addValue
        },
      }

      const newNodeId = await addToFirebase('nodes', newNode)
      setElements((els) =>([...els, {...newNode, id: newNodeId}]))
    }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    const updatedNode = {...activeNode, data : { label: editValue}}
    console.log(updatedNode)
    updateNode(updatedNode)
  }

  // console.log(activeNode)
return <div>

  <div>
    <form >
      <input type="textarea" value={addValue} rows="5" cols="33" onChange={handleAddChange} />
      <button onClick={handleAddSubmit}>Add New Node<Emoji e={'✅'}/></button>
    </form>
  </div>

  {isEditing && <div>
    <form >
      <input type="textarea" value={editValue} rows="5" cols="33" onChange={handleEditChange} />
      <button onClick={handleEditSubmit}>Submit Edit<Emoji e={'✅'}/></button>
    </form>
  </div>}


</div>;
};

export default Sidebar;
