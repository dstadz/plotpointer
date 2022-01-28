import {useState, useEffect} from 'react'
import { addToFirebase } from '../utils/firebase'
import {collection, query } from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { isEditingState, elementsState, ActiveNodeState } from '../utils/store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Emoji from './misc/Emoji';
import EditNodeForm from './EditNodeForm';



const Sidebar = () => {
  const [elements, setElements] = useRecoilState(elementsState);
  const [addValue, setAddValue] = useState('')

  const onElementsRemove = (elementsToRemove) =>{
    setElements((els) => removeElements(elementsToRemove, els));
  }

  const handleAddChange = (e) => {
    e.preventDefault()
    setAddValue(e.target.value)
    }

    const handleAddSubmit = async (e) => {
    e.preventDefault()
      const newNode = {
        type: 'eventNode',
        position: { x: 150, y: 150 },
        data: { label: addValue },
      }

      const newNodeId = await addToFirebase('nodes', newNode)
      setElements((els) =>([...els, {...newNode, id: newNodeId}]))
      setAddValue('')
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

  <EditNodeForm />



    {elements.map(el => {
      return el?.data?.label && <li>{el?.data?.label}</li>

    })}

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
