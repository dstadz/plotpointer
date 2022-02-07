import { useEffect } from 'react'
import { db } from 'utils/firebase'
import EventNode from './Nodes/EventNode'
import { TimeLineWrapper } from './styles'
import { useNodeHook } from 'utils/hooks/useNodeHook'
import {collection, query } from "firebase/firestore"
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ActiveNodeState, elementsState } from 'utils/store'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ReactFlow, { Background, MiniMap, Controls } from 'react-flow-renderer'
import { useStoryHook } from 'utils/hooks'

const TimeLine = () => {
  const { activeStory, updateStory } = useStoryHook()
  const setActiveNode = useSetRecoilState(ActiveNodeState)
  const [elements, setElements] = useRecoilState(elementsState)
  const [nodeValues, nodeLoading, nodeError] = useCollectionData(query(collection(db, 'nodes')))
  const [edgeValues, edgeLoading, edgeError] = useCollectionData(query(collection(db, 'edges')))
  useEffect(() => {
    if (nodeError || edgeError) {console.error(nodeError, edgeError)}
    if (nodeValues && edgeValues) {setElements([...nodeValues, ...edgeValues])}
  }, [nodeLoading, edgeLoading])

  const { updateNode, onConnect } = useNodeHook()
  const onNodeDragStop = (_, node) => { updateNode(node) }
  const onNodeDoubleClickHandler = (_, node) => { console.log(node) }
  const onElementClickHandler = (_, element) => { setActiveNode(element) }
  const onEdgeContextMenuHanlder = (_, element) => { console.log(element) }

  const nodeTypes = {eventNode: EventNode,}
  const onLoad = ({setTransform}) => {
    console.log({activeStory})
    setTransform({
      x: activeStory.x,
      y: activeStory.y,
      zoom: activeStory.zoom,
    })
  }

  const onMoveEndHandler = flowTransform => {
    const newStory = {...activeStory, ...flowTransform}
    // console.log('onMoveEnd:', flowTransform, newStory)
    updateStory(newStory)
  }

return <TimeLineWrapper id='timeline'>
  {activeStory.id && <ReactFlow id='react-flow'
    onLoad={onLoad}
    elements={elements}
    onConnect={onConnect}
    nodeTypes={nodeTypes}
    onMoveEnd={onMoveEndHandler}
    onNodeDragStop={onNodeDragStop}
    onElementClick={onElementClickHandler}
    onNodeDoubleClick={onNodeDoubleClickHandler}
    onEdgeContextMenu={onEdgeContextMenuHanlder}
    // onNodeContextMenu={onNodeContextMenu}
  >
    <MiniMap />
    <Controls />
    <Background
      variant="lines"
      gap={50}
      size={.1}
    />
  </ReactFlow>}
</TimeLineWrapper>
}

export default TimeLine
