import React, { useState, useEffect } from 'react'
import {
  useStoreState,
  useStoreActions
} from 'react-flow-renderer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addToFirebase, updateFirebase } from 'utils/firebase'
import { ActiveStoryState } from 'utils/store'

export const useStoryHook = () => {
  const activeStory = useRecoilValue(ActiveStoryState)
  const [xPos, yPos] = useStoreState((store) => store.transform);
  // const addStory = (story) => {addToFirebase('stories', story)}

  useEffect(() => {
    const updateLastWindowPos = () => {
      const lastPosStory = {
        ...activeStory,
        position: {
          x: Math.floor(xPos),
          y: Math.floor(yPos)
        }
      }
      updateFirebase('stories', activeStory.id, lastPosStory)

    }
    window.addEventListener('beforeunload', updateLastWindowPos);
    return () => { window.removeEventListener('beforeunload', updateLastWindowPos) }
  }, [])

// return {}
}

const story = {
  userId: "",
  title: "",
  position: {
    x: -1 * Math.floor(0) + 25,
    y: Math.floor(0) + 25
  }}
