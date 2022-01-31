import React, { useState, useEffect } from 'react'
import { addToFirebase } from 'utils/firebase'

import { useRecoilState, useRecoilValue } from 'recoil'
import {updateFirebase } from 'utils/firebase'
import { ActiveCharacterState, elementsState } from 'utils/store/'





const characterObj = {
  storyId: '',
  name: '',
  emoji: '😁',
  desccription: '',
  data: {}
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
