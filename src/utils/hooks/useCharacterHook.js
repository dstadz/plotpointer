import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addToFirebase, updateFirebase } from 'utils/firebase'
import { ActiveCharacterState, characterListState } from 'utils/store/'

export const useCharacterHook = () => {
  const activeCharacter = useRecoilValue(ActiveCharacterState)
  const [characters, setCharacters] = useRecoilState(characterListState)

  const addNewCharacter = async newCharacter => {
    const newCharacterId = await addToFirebase('characters', newCharacter)
    setCharacters(chars =>([...chars, { ...newCharacter, id: newCharacterId }]))
  }

  const updateCharacter = character => {
    updateFirebase('characters', character.id, character)
  }

  return {
    addNewCharacter,
    updateCharacter,
  }
}

const characterObj = {
  storyId: '',
  name: '',
  emoji: '😁',
  desccription: '',
  data: {}
}
