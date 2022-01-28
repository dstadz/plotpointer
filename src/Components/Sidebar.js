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
import { EditNodeFormWrapper } from './styles';
import { useRef } from 'react';



const Sidebar = () => {
  const [isEditing, setEditing] = useRecoilState(isEditingState)
  const setElements = useSetRecoilState(elementsState);
  const activeNode = useRecoilValue(ActiveNodeState);
  const [addValue, setAddValue] = useState('')
  const [editValue, setEditValue] = useState('')

  const { updateNode, onConnect } = useNodeHook()

  const editFormRef = useRef()
  useEffect(() => {
    if (isEditing) {
      editFormRef.current.focus();
    }
  },[isEditing])


const onElementsRemove = (elementsToRemove) =>{
  setElements((els) => removeElements(elementsToRemove, els));
  }


  useEffect(() => {
    if (isEditing) setEditValue(activeNode.data?.label || '' )
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
        data: { label: addValue },
      }

      const newNodeId = await addToFirebase('nodes', newNode)
      setElements((els) =>([...els, {...newNode, id: newNodeId}]))
    }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    const updatedNode = {...activeNode, data : { label: editValue}}
    setElements((els) => els.map(el => el.id == activeNode.id ? updatedNode : el))
    updateNode(updatedNode)
    setEditing(false)
  }

  // const onDragStart = (event, nodeType) => {
  //   event.dataTransfer.setData('application/reactflow', nodeType);
  //   event.dataTransfer.effectAllowed = 'move';
  // };
  // console.log(activeNode)
return <div>

  <div>
    <form >
      <textarea value={addValue} rows="5" cols="33" onChange={handleAddChange} />
      <button onClick={handleAddSubmit}>Add New Node<Emoji e={'✅'}/></button>
    </form>
  </div>

  {isEditing && <EditNodeFormWrapper>
    <form onSubmit={handleEditSubmit}>
      <textarea
        value={editValue}
        rows="5" cols="33"
        onChange={handleEditChange}
        ref={editFormRef}
      />
      <button type='submit'>Submit Edit<Emoji e={'✅'}/></button>
    </form>
  </EditNodeFormWrapper>}

  {/* <p className="description">
    You can drag these nodes to the pane on the right.
  </p>
  <div className="eventNode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
    Input Node
  </div>
  <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
    Default Node
  </div>
  <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
    Output Node
  </div> */}
</div>;
};

export default Sidebar;
