import { useEffect, useRef } from 'react'
import { addEdge } from 'react-flow-renderer'
import { collection, query } from "firebase/firestore"
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import {
  elementsState,
  isEditingState,
  ActiveNodeState,
  ActiveStoryState,
} from 'utils/store'
import { db, addToFirebase, updateFirebase } from 'utils/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export const useNodeHook = (callLocation) => {
  const hasLoadedYet = useRef(false)
  const activeStory = useRecoilValue(ActiveStoryState)
  const setEditing = useSetRecoilState(isEditingState)
  const setActiveNode = useSetRecoilState(ActiveNodeState)
  const [elements, setElements] = useRecoilState(elementsState)
  const [nodeValues, nodeLoading, nodeError] = useCollectionData(query(collection(db, 'nodes')))
  const [edgeValues, edgeLoading, edgeError] = useCollectionData(query(collection(db, 'edges')))
  useEffect(() => {
    if (nodeError || edgeError) {console.error(nodeError, edgeError)}
    if (nodeValues && edgeValues) {
      hasLoadedYet.current = true
      setElements([...nodeValues, ...edgeValues])
    }
  }, [nodeLoading, edgeLoading])


  useEffect(() => {

    callLocation=="timeline" &&
    hasLoadedYet &&
    console.log(callLocation,elements)
  },[elements])



  const getNodeById = (id) => elements.find(node => node.id === id)

  const addNewNode = async newNode => {

    const newNodeId = await addToFirebase('nodes', newNode)
    setElements((els) =>([...els, {...newNode, id: newNodeId}]))

    return newNodeId
  }

  const addNextEventNode = async prevNode => {
    const { data:{characters} , position: {x, y} } = prevNode
    const nextEvent = {
      storyId: activeStory.id,
      type: 'eventNode',
      position: {
        x: x + 500,
        y: y
      },
      data: {
        label: 'And then...',
        characters: characters || [],
      }
    }
    // const nextNodeId =
    addNewNode(nextEvent)
    .then(newNodeId => {
      const edgeParams = {
        source: prevNode.id,
        sourceHandle: null,
        target: newNodeId,
        targetHandle: null
      }
      onConnect(edgeParams)

      //focus new node and open edit node form
      setEditing(true)
      setActiveNode(getNodeById(newNodeId))

    })
    .catch(err => console.error(err))
  }

  const updateNode = node => { updateFirebase('nodes', node.id, node) }

  const onConnect = (params) => {
    console.log(params)
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
    getNodeById,
    addNewNode,
    addNextEventNode,
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
