import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { TimeLineWrapper } from '../styles';
import { addToFirebase } from '../utils/firebase'
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';



import {  MiniMap, Controls } from 'react-flow-renderer';

// id: elements.length,
// type: 'input',//'output', 'default'
// data: content,// { label: 'Input Node' },
// position: location, //{ x: 250, y: 25 },
// targetPosition: 'left',
// sourcePosition: 'right'

// let event = {
//   time: [year, month, day, hour, ],
//   location: [x,y, title],
//   people: [...characters],
//   description: 'events',
//   source: 'source',
//   outcomes: 'targets'
// }

import { useMoveNode } from '../utils/hooks/useMoveNode'

const TimeLine = () => {
  const [elements, setElements] = useState([]);
  const { logNode } = useMoveNode()
  const [nodeValues, nodeLoading, nodeError] = useCollectionData(query(collection(db, 'nodes')))
  const [edgeValues, edgeLoading, edgeError] = useCollectionData(query(collection(db, 'edges')))
  const onNodeDragStart = (event, node) => {}//console.log('drag start', node);
  const onNodeDragStop = (event, node) =>{
    // console.log('drag stop', node)
    logNode(node)
  };
  const onElementClick = (event, element) => console.log('click', element);

  useEffect(() => {
    if (nodeError) {console.error(nodeError)}
    if (edgeError) {console.error(edgeError)}
    if (nodeValues && edgeValues) {setElements([...nodeValues, ...edgeValues])}
  }, [nodeLoading, edgeLoading])

const [value, setValue] = useState('')





const onConnect = (params) => {
console.log("edge parameters:", params)
setElements((els) => {
  console.log('prevlist', els)
  const edge = addEdge(params, els)
  console.log(edge[-1], edge)


  addToFirebase('edges', edge[edge.length - 1] )
  return edge
})};

const onElementsRemove = (elementsToRemove) =>{
setElements((els) => removeElements(elementsToRemove, els));
}


const tickleState = () => {
console.log(` tickle state: ${elements}`, elements)
}

const handleaddToFirebaseFormSubmit = async () => {
// e.preventDefault()
  // console.log('handleaddToFirebaseFormSubmit')
  const newNode = {
    data: { label: value },
    position: {
      x: Math.floor(Math.random()*100)+150,
      y: Math.floor(Math.random()*100)+150
    }
  }
  const newNodeId = await addToFirebase('nodes', newNode)
  console.log(newNodeId)
  setElements((els) =>([...els, {...newNode, id: newNodeId}]))
}


const handleChange = (e) => {
setValue(e.target.value)
}

return <>
<button onClick={tickleState}>tickle Nodes</button>

<form onSubmit={(e)=> {
e.preventDefault();
handleaddToFirebaseFormSubmit(value)
}}>
<input type="text" value={value} onChange={handleChange} />

<input type="submit"/>
</form>

<TimeLineWrapper>
    <ReactFlow
      elements={elements}
      elementsSelectable={true}
      nodesConnectable={true}
      nodesDraggable={true}
      zoomOnScroll={true}
      panOnScroll={true}
      panOnScrollMode={true}
      zoomOnDoubleClick={true}
      onConnect={onConnect}
      onElementClick={onElementClick}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      // onLoad={onLoad}
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
</TimeLineWrapper>
</>
}

export default TimeLine
