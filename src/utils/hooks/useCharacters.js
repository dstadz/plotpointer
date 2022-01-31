import React, { useState, useEffect } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { addToFirebase } from '../firebase'

import { useRecoilState, useRecoilValue } from 'recoil'
import {updateFirebase } from '../firebase'
import { ActiveCharacterState, elementsState } from '../store'





const characterObj = {
  name: '',
  emoji: '😁',
  storyId: '',
  desccription: '',
}






export const useCharacterHook = () => {
  const [newKeyVal, setKeyVal] = useState({});
  const activeCharacter = useRecoilValue(ActiveCharacterState)
  const [elements, setElements] = useRecoilState(elementsState)

  const setAttribute = (field, value) => {
    setKeyVal({[field]: value})
  }

  const addNewCharacter = async newCharacter => {
    const newCharacterId = await addToFirebase('characters', newCharacter)
    // setElements((els) =>([...els, {...newCharacter, id: newCharacterId}]))
  }

  const updateCharacter = character => { updateFirebase('characters', character.id, character) }


  // useEffect(() => {
  //   const newEl = {...activeCharacter, data: {...newKeyVal}}
  //   setElements(els => els.map((el) => el.id == activeCharacter.id ? newEl : el))
  // }, [setElements]);

  // const onConnect = (params) => {
  //   setElements((els) => {
  //     const edge = addEdge(params, els)
  //     addToFirebase('edges', edge[edge.length - 1])
  //     return edge
  //   })
  // }

  return {
    addNewCharacter,
    updateCharacter,
    // onConnect,
    setAttribute,
  }
}
