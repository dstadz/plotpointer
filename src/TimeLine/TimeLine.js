import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { TimeLineWrapper } from '../styles';
import { addToFirebase } from '../utils/firebase'
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';


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







const TimeLine = () => {
  const [elements, setElements] = useState([]);

  const [nodeValues, nodeLoading, nodeError] = useCollectionData(
    query(collection(db, 'nodes'))
  )
  const [edgeValues, edgeLoading, edgeEerror] = useCollectionData(
    query(collection(db, 'edges'))
  )//options)
  useEffect(() => {
    console.log(nodeValues)// ...edgeValues])
    console.log(nodeLoading)// ...edgeLoading
    if (nodeValues && edgeValues) {
      console.log(nodeValues, edgeValues)
      setElements([...nodeValues, ...edgeValues])
    }
  }, [nodeLoading, edgeLoading])




  const [isAddFormUp, setAddFormUp] = useState(!false);


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

  const toggleAddForm = () => {
    console.log(elements)
    // setAddFormUp(wasUp => !wasUp)

  }

  const tickleState = () => {
    console.log(` tickle state: ${elements}`)
  }

  const handleaddToFirebaseFormSubmit = () => {
    // e.preventDefault()
    // setValue((prev) => ({
    //   ...prev,
    //   position: {
    //     x: Math.random()*100+150,
    //     y: Math.random()*100+150
    //   }
    // }))
    // addToFirebase('nodes', {value})

  }


  const handleChange = (e) => {
    // setValue(e.target.value)
  }

return <>
  <button onClick={toggleAddForm}>Add Node</button>
  <button onClick={toggleAddForm}>Fetch Nodes</button>
  <button onClick={tickleState}>tickle Nodes</button>

  {isAddFormUp && <form onSubmit={(e)=> {
    e.preventDefault();
    handleaddToFirebaseFormSubmit()
    }}>
    <input type="text" placeholder='content' />
    {/* <input type="text" value={value} onChange={handleChange} /> */}

    <input type="submit"/>
  </form>}
<TimeLineWrapper>

    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      deleteKeyCode={46} /* 'delete'-key */
    />
</TimeLineWrapper>
</>
}

export default TimeLine
