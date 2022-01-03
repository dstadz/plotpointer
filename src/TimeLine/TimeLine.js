import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { TimeLineWrapper } from '../styles';
import { addToFirebase } from '../utils/firebase'


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
  const [isAddFormUp, setAddFormUp] = useState(!false);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const nodeQ = query(collection(db, 'nodes'), orderBy('created', 'desc'))
    onSnapshot(nodeQ, (querySnapshot) => {
      setElements(prepEl => querySnapshot.docs.map((doc) => doc.data()))
    })

    const edgeQ = query(collection(db, 'edges'), orderBy('created', 'desc'))
    onSnapshot(edgeQ, (querySnapshot) => {
      setElements(querySnapshot.docs.map((doc) => doc.data()))
    })
  },[])






  const onConnect = (params) => {
    console.log(params)
    setElements((els) => {
      const edge = addEdge(params, els)
      console.log(edge[-1], edge)


      addToFirebase('edges', edge[-1] )
      return edge
    })};

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));


  const toggleAddForm = () => {
    console.log(elements)
    // setAddFormUp(wasUp => !wasUp)

  }


  const handleaddToFirebaseFormSubmit = (e, values) => {
    e.preventDefault()
    console.log(values, e)

    addToFirebase(e, (()=>console.log('parameter')))

  }

return <>
  <button onClick={toggleAddForm}>Add Node</button>
  <button onClick={toggleAddForm}>Fetch Nodes</button>

  {isAddFormUp && <form onSubmit={handleaddToFirebaseFormSubmit}>
    <input type="text" placeholder='content' />
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
