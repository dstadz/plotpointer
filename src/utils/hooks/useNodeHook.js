import React, { useState, useEffect } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { addToFirebase } from '../firebase'

import { useRecoilState, useRecoilValue } from 'recoil'
import {updateFirebase } from '../firebase'
import { ActiveNodeState, elementsState } from '../store'


export const useNodeHook = () => {
  const [newKeyVal, setKeyVal] = useState({});
  const activeNode = useRecoilValue(ActiveNodeState)
  const [elements, setElements] = useRecoilState(elementsState)

  const setAttribute = (field, value) => {
    setKeyVal({[field]: value})
  }

  const addNewNode = async newNode => {
    const newNodeId = await addToFirebase('nodes', newNode)
    setElements((els) =>([...els, {...newNode, id: newNodeId}]))
  }

  const updateNode = node => { updateFirebase('nodes', node.id, node) }


  useEffect(() => {
    const newEl = {...activeNode, data: {...newKeyVal}}
    setElements(els => els.map((el) => el.id == activeNode.id ? newEl : el))
  }, [setElements]);

  const onConnect = (params) => {
    setElements((els) => {
      const edge = addEdge(params, els)
      addToFirebase('edges', edge[edge.length - 1])
      return edge
    })
  }

  return {
    addNewNode,
    updateNode,
    onConnect,
    setAttribute,
  }
}
