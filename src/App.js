import {useState, useEffect} from 'react'
import { AppWrapper } from './styles';
import TimeLine from './TimeLine/TimeLine';
import {collection, query } from "firebase/firestore"
import {db} from './utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { addToFirebase } from './utils/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { elementsState } from './utils/store'
import { useSetRecoilState } from 'recoil';
import './App.css';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';


const App = () => {
  const  setElements = useSetRecoilState(elementsState);
  const [nodeValues, nodeLoading, nodeError] = useCollectionData(query(collection(db, 'nodes')))
  const [edgeValues, edgeLoading, edgeError] = useCollectionData(query(collection(db, 'edges')))

  useEffect(() => {
    if (nodeError) {console.error(nodeError)}
    if (edgeError) {console.error(edgeError)}
    if (nodeValues && edgeValues) {
      console.log(nodeValues, edgeValues)
      setElements([...nodeValues, ...edgeValues])
    }
  }, [nodeLoading, edgeLoading])

  const [value, setValue] = useState('')



const onElementsRemove = (elementsToRemove) =>{
setElements((els) => removeElements(elementsToRemove, els));
}

const handleaddToFirebaseFormSubmit = async () => {
// e.preventDefault()
  // console.log('handleaddToFirebaseFormSubmit')
  const newNode = {
    type: 'eventNode',
    position: {
      x: Math.floor(Math.random()*100)+150,
      y: Math.floor(Math.random()*100)+150
    },
    data: {
      label: value
    },
  }
  const newNodeId = await addToFirebase('nodes', newNode)
  setElements((els) =>([...els, {...newNode, id: newNodeId}]))
}



  const handleChange = (e) => {
    setValue(e.target.value)
    }

return <AppWrapper>

  <form onSubmit={(e)=> {
  e.preventDefault();
  handleaddToFirebaseFormSubmit(value)
  }}>
  <input type="text" value={value} onChange={handleChange} />

  <input type="submit"/>
  </form>

  <TimeLine />

</AppWrapper>
}

export default App;
