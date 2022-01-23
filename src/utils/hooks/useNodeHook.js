import React, { useState, useEffect } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { addToFirebase } from '../firebase'

import { useRecoilState, useRecoilValue } from 'recoil'
import {updateFirebase } from '../firebase'
import { ActiveNodeState, elementsState } from '../store'


export const useNodeHook = () => {
  const activeNode = useRecoilValue(ActiveNodeState)

  const [elements, setElements] = useRecoilState(elementsState)
  const [newKeyVal, setKeyVal] = useState({});

  const setAttribute = (field, value) => {
    console.log(field, value)
    // setNewField(field)
    // setNewValue(value)
    setKeyVal({[field]: value})
  }


  const updateNode = (node) => {
    updateFirebase('nodes', node.id, node)


  }
  useEffect(() => {
    const newEl = {...activeNode, data: {...newKeyVal}}
    console.log('newField:value, ', {activeNode}, {newEl})
    setElements((els) => els.map((el) => {
        if (el.id == activeNode.id) return newEl
        return el;
      })
    );
  }, [newKeyVal, setElements]);

  const onConnect = (params) => {
    // console.log("edge parameters:", params)
    setElements((els) => {
      const edge = addEdge(params, els)
      addToFirebase('edges', edge[edge.length - 1] )
      return edge
    })
  }

  return {
    updateNode,
    onConnect,
    setAttribute,
  }
}
