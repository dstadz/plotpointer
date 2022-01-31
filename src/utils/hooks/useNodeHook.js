import React, { useState, useEffect } from 'react'
import { addEdge } from 'react-flow-renderer';
import { addToFirebase, updateFirebase } from 'utils/firebase'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ActiveNodeState, ActiveStoryState, elementsState } from 'utils/store'

export const useNodeHook = () => {
  const activeNode = useRecoilValue(ActiveNodeState)
  const activeStory = useRecoilValue(ActiveStoryState)
  const [elements, setElements] = useRecoilState(elementsState)

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
    addNewNode,
    updateNode,
    onConnect,
  }
}

const node = {
  storyId: "",
  type: "",
  position: {x: 0, y: 0},
  data: {
    label: '',
    characters: [{}]
  },
}
