import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { TimeLineWrapper } from '../styles';
import { addToFirebase } from '../utils/firebase'
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';



import { MiniMap, Controls } from 'react-flow-renderer';
import { useRecoilValue } from 'recoil';

import { useNode } from '../utils/hooks/useNode'
import EventNode from './EventNode'
import { elementsState } from '../utils/store';

const TimeLine = () => {
  const { updateNode, onConnect } = useNode()
  const elements = useRecoilValue(elementsState)
  const onNodeDragStop = (event, node) => { updateNode(node) }

  const onElementClick = (event, element) => console.log('click', element);





    const nodeTypes = {
      eventNode: EventNode,
    };

return (
<TimeLineWrapper id='timeline'>
  <ReactFlow
    nodeTypes={nodeTypes}
    elements={elements}
    elementsSelectable={true}
    nodesConnectable={true}
    nodesDraggable={true}
    zoomOnScroll={true}
    zoomOnDoubleClick={true}
    onConnect={onConnect}
    onNodeDragStop={onNodeDragStop}
    // onLoad={onLoad}
  >
    <MiniMap />
    <Controls />
  </ReactFlow>
</TimeLineWrapper>
)}

export default TimeLine


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
