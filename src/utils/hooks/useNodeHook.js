import { useEffect } from 'react'
import { addEdge } from 'react-flow-renderer'
import { collection, query } from "firebase/firestore"
import { useRecoilState, useRecoilValue } from 'recoil'
import { ActiveStoryState, elementsState } from 'utils/store'
import { db, addToFirebase, updateFirebase } from 'utils/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export const useNodeHook = () => {
  const activeStory = useRecoilValue(ActiveStoryState)
  const [elements, setElements] = useRecoilState(elementsState)
  const [nodeValues, nodeLoading, nodeError] = useCollectionData(query(collection(db, 'nodes')))
  const [edgeValues, edgeLoading, edgeError] = useCollectionData(query(collection(db, 'edges')))
  useEffect(() => {
    if (nodeError || edgeError) {console.error(nodeError, edgeError)}
    if (nodeValues && edgeValues) {setElements([...nodeValues, ...edgeValues])}
  }, [nodeLoading, edgeLoading])

  const addNewNode = async newNode => {
    const newNodeId = await addToFirebase('nodes', newNode)
    setElements((els) =>([...els, {...newNode, id: newNodeId}]))
  }

  const updateNode = node => { updateFirebase('nodes', node.id, node) }

  const onConnect = (params) => {
    setElements((els) => {
      const newElementList = addEdge(params, els)
      const latestEdge = newElementList[newElementList.length - 1]
      latestEdge.storyId = activeStory.id
      addToFirebase('edges', latestEdge)
      return newElementList
    })
  }

  return {
    elements,
    onConnect,
    addNewNode,
    updateNode,
  }
}

const node = {
  storyId: "",
  type: "",
  position: {x: 0, y: 0},
  data: {
    label: '',
    characters: ['charId']
  },
}
