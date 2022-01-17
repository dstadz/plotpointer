import React, { useState, useEffect } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { addToFirebase } from '../firebase'

import { useRecoilState } from 'recoil'
import {updateFirebase } from '../firebase'
import { elementsState } from '../store'


export const useNode = () => {
  const [elements, setElements] = useRecoilState(elementsState)

  const updateNode = (node) => {
    console.log('log node', node)
    updateFirebase('nodes', node.id, node)
  }

  const onConnect = (params) => {
    console.log("edge parameters:", params)
    setElements((els) => {
      console.log('prevlist', els)
      const edge = addEdge(params, els)
      console.log(edge[-1], edge)


      addToFirebase('edges', edge[edge.length - 1] )
      return edge
    })};

  return {
    updateNode,
    onConnect
  }
}
