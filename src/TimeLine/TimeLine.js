import ReactFlow from 'react-flow-renderer';
import { TimeLineWrapper } from '../styles';
import { MiniMap, Controls } from 'react-flow-renderer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNodeHook } from '../utils/hooks/useNodeHook'
import EventNode from '../Components/Nodes/EventNode'
import { ActiveNodeState, elementsState } from '../utils/store';

const TimeLine = () => {
  const { updateNode, onConnect } = useNodeHook()
  const elements = useRecoilValue(elementsState)
  const setActiveNode = useSetRecoilState(ActiveNodeState)
  const onNodeDragStop = (event, node) => { updateNode(node) }

  const onElementClickHandler = (_, element) => {
    // console.log('element', element);
    setActiveNode(element)
  };

  const nodeTypes = {
    eventNode: EventNode,
  };

return <TimeLineWrapper id='timeline'>
  <ReactFlow
    nodeTypes={nodeTypes}
    elements={elements}
    elementsSelectable={true}
    nodesConnectable={true}
    nodesDraggable={true}
    zoomOnScroll={true}
    zoomOnDoubleClick={true}
    onConnect={onConnect}
    onNodeDragStop={onNodeDragStop}
    onElementClick={onElementClickHandler}
  >
    <MiniMap />
    <Controls />
  </ReactFlow>
</TimeLineWrapper>
}

export default TimeLine

    // onLoad={onLoad}
    /* on
onElementClick(event, element): called when user clicks node or edge
onElementsRemove(elements): called when user removes node or edge
onNodeDragStart(event, node): node drag start
onNodeDrag(event, node): node drag
onNodeDragStop(event, node): node drag stop
onNodeMouseEnter(event, node): node mouse enter
onNodeMouseMove(event, node): node mouse move
onNodeMouseLeave(event, node): node mouse leave
onNodeContextMenu(event, node): node context menu
onNodeDoubleClick(event, node): node double click
onConnect({ source, target }): called when user connects two nodes
onConnectStart(event, { nodeId, handleType }): called when user starts to drag connection line
onConnectStop(event): called when user stops to drag connection line
onConnectEnd(event): called after user stops or connects nodes
onEdgeUpdate(oldEdge, newConnection): called when the end of an edge gets dragged to another source or target
onEdgeMouseEnter(event, edge): edge mouse enter
onEdgeMouseMove(event, edge): edge mouse move
onEdgeMouseLeave(event, edge): edge mouse leave
onEdgeContextMenu(event, edge): called when user does a right-click on an edge
onEdgeUpdateStart(event, edge): called when user starts to update an edge
onEdgeUpdateEnd(event, edge): called when user ends an edge update (for TS users: this is a normal MouseEvent and not a React.MouseEvent like the other ones).
onLoad(reactFlowInstance): called after flow is initialized
onMove(flowTransform): called when user is panning or zooming
onMoveStart(flowTransform): called when user starts panning or zooming
onMoveEnd(flowTransform): called when user ends panning or zooming
onSelectionChange(elements): called when user selects one or multiple elements
onSelectionDragStart(event, nodes): called when user starts to drag a selection
onSelectionDrag(event, nodes): called when user drags a selection
onSelectionDragStop(event, nodes): called when user stops to drag a selection
onSelectionContextMenu(event, nodes): called when user does a right-click on a selection
onPaneClick(event): called when user clicks directly on the canvas
onPaneContextMenu(event): called when user does a right-click on the canvas
onPaneScroll(event): called when user scrolls pane (only works when zoomOnScroll is set to `false)
Interaction

    */


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
