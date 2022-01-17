import logo from './logo.svg';
import './App.css';
import { AppWrapper } from './styles';
import TimeLine from './TimeLine/TimeLine';
import DnDFlow from './TimeLine/DnDFlow';
import Sidebar from './TimeLine/SideBar';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';

import {useState, useEffect} from 'react'
import {collection, query } from "firebase/firestore"
import {db} from './utils/firebase'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { addToFirebase } from './utils/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNode } from './utils/hooks/useNode'
import { elementsState } from './utils/store'
import { useSetRecoilState } from 'recoil';


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
    data: { label: value },
    type: 'eventNode',
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
