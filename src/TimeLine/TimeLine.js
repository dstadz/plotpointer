import React, { useState } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { TimeLineWrapper } from '../styles';
import { AddNode, addNode } from '../Components/AddNode'


// let event = {
//   time: [year, month, day, hour, ],
//   location: [x,y, title],
//   people: [...characters],
//   description: 'events',
//   source: 'source',
//   outcomes: 'targets'
// }




const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
];

const TimeLine = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const addNode = (e) => {
    console.log(elements)

    const newNode = {
      id: elements.length + 1,
      // type: 'input',
      data: { label: 'Input Node' },
      position: { x: (100 * Math.random()), y: (100 * Math.random()) },
      targetPosition: 'left',
      sourcePosition: 'right'

    }
    AddNode(e, (()=>console.log('parameter')))
    setElements(prevList =>[ ...prevList, newNode ])
  }


return <TimeLineWrapper>
  <button onClick={addNode}>Add Node</button>

  <ReactFlow
    elements={elements}
    onElementsRemove={onElementsRemove}
    onConnect={onConnect}
    deleteKeyCode={46} /* 'delete'-key */
  />
</TimeLineWrapper>
}

export default TimeLine
