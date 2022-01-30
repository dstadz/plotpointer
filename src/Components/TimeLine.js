import {useEffect} from 'react'
import { TimeLineWrapper } from './styles';
import { Background, MiniMap, Controls } from 'react-flow-renderer';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNodeHook } from 'utils/hooks/useNodeHook'
import EventNode from './Nodes/EventNode'
import { ActiveNodeState, elementsState } from '../utils/store';

import {collection, query } from "firebase/firestore"
import {db} from '../utils/firebase'
import ReactFlow from 'react-flow-renderer';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const TimeLine = () => {
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

return <TimeLineWrapper id='timeline'>
  <ReactFlow id='react-flow'
    nodeTypes={nodeTypes}
    elements={elements}
    elementsSelectable={true}
    nodesConnectable={true}
    nodesDraggable={true}
    zoomOnScroll={true}
    zoomOnDoubleClick={true}
    onConnect={onConnect}
    onNodeDragStop={onNodeDragStop}
    onNodeDoubleClick={onNodeDoubleClickHandler}
    onElementClick={onElementClickHandler}
    onEdgeContextMenu={onEdgeContextMenuHanlder}
    // onNodeContextMenu={onNodeContextMenu}
  >
    <MiniMap />
    <Controls />

    {/* <div style={{backgroundColor: 'red'}}>
      another comp
    </div> */}

    <Background
      variant="lines"
      gap={50}
      size={.1}
    />
  </ReactFlow>
</TimeLineWrapper>
}

export default TimeLine
