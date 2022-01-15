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
import EventNode from './EventNode'

const TimeLine = ({elements, setElements}) => {
  const { logNode } = useMoveNode()

  const onNodeDragStart = (event, node) => {}//console.log('drag start', node);
  const onNodeDragStop = (event, node) =>{
    // console.log('drag stop', node)
    logNode(node)
  };
  const onElementClick = (event, element) => console.log('click', element);



  const onConnect = (params) => {
    console.log("edge parameters:", params)
    setElements((els) => {
      console.log('prevlist', els)
      const edge = addEdge(params, els)
      console.log(edge[-1], edge)


      addToFirebase('edges', edge[edge.length - 1] )
      return edge
    })};

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
)}

export default TimeLine
