import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addToFirebase, updateFirebase } from 'utils/firebase'
import { ActiveCharacterState, characterListState } from 'utils/store/'
import {collection, query } from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from 'utils/firebase'



export const useCharacterHook = () => {
  const activeCharacter = useRecoilValue(ActiveCharacterState)
  const [characterList, setCharacterList] = useRecoilState(characterListState)
  const [characterValues, characterLoading, characterError] = useCollectionData(query(collection(db, 'characters')))
  useEffect(() => {
    if (characterError) {console.error(characterError)}
    if (characterValues) {setCharacterList([...characterValues])}
  }, [characterLoading])

  const addNewCharacter = async newCharacter => {
    const newCharacterId = await addToFirebase('characters', newCharacter)
    setCharacterList(chars =>([...chars, { ...newCharacter, id: newCharacterId }]))
  }

  const updateCharacter = character => {
    updateFirebase('characters', character.id, character)
  }

  return {
    characterList,
    addNewCharacter,
    updateCharacter,
    setCharacterList,
  }
}

const characterObj = {
  storyId: '',
  name: '',
  emoji: '😁',
  desccription: '',
  data: {}
}
