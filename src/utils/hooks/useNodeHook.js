import React, { useState, useEffect } from 'react'
import { addEdge } from 'react-flow-renderer';
import { addToFirebase } from 'utils/firebase'

import { useRecoilState, useRecoilValue } from 'recoil'
import {updateFirebase } from 'utils/firebase'
import { ActiveNodeState, elementsState } from 'utils/store'


const node = {
  storyId: "",
  type: "",
  position: {x: 0, y: 0},
  data: {
    label: '',
    characters: [{}]
  },
}


export const useNodeHook = () => {
  const activeNode = useRecoilValue(ActiveNodeState)
  const [elements, setElements] = useRecoilState(elementsState)

  const addNewNode = async newNode => {
    const newNodeId = await addToFirebase('nodes', newNode)
    setElements((els) =>([...els, {...newNode, id: newNodeId}]))
  }

  const updateNode = node => { updateFirebase('nodes', node.id, node) }

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
  }
}
