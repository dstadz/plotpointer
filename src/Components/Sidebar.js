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
import AddNodeForm from './AddNodeForm';
import { useNodeHook } from '../utils/hooks/useNodeHook';



const Sidebar = () => {
  const [elements, setElements] = useRecoilState(elementsState);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }
  const { updateNode, onConnect } = useNodeHook()



return <div>
  <AddNodeForm />
  <EditNodeForm />
</div>;
};

export default Sidebar;
