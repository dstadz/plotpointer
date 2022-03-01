import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addToFirebase, updateFirebase } from 'utils/firebase'
import { ActiveCharacterState, allCharacterListState } from 'utils/store/'
import {collection, query } from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from 'utils/firebase'



export const useCharacterHook = () => {
  const activeCharacter = useRecoilValue(ActiveCharacterState)
  const [allCharacterList, setAllCharacterList] = useRecoilState(allCharacterListState)
  const [characterValues, characterLoading, characterError] = useCollectionData(query(collection(db, 'characters')))
  useEffect(() => {
    if (characterError) {console.error(characterError)}
    if (characterValues) {
      // console.log(characterValues)
      setAllCharacterList([...characterValues])}
  }, [characterLoading])

  const getCharById = (id) => allCharacterList.find(char => char.id === id)

  const addNewCharacter = async newCharacter => {
    const newCharacterId = await addToFirebase('characters', newCharacter)
    setAllCharacterList(chars =>([...chars, { ...newCharacter, id: newCharacterId }]))
  }

  const updateCharacter = character => {
    updateFirebase('characters', character.id, character)
  }

  return {
    allCharacterList,
    addNewCharacter,
    updateCharacter,
    setAllCharacterList,
    getCharById
  }
}

const characterObj = {
  storyId: '',
  name: '',
  emoji: '😁',
  desccription: '',
  data: {}
}
