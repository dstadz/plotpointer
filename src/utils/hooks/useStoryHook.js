import React, { useState, useEffect, useRef } from 'react'
import { db } from 'utils/firebase'
import {collection, query } from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addToFirebase, updateFirebase, getFromFirebase } from 'utils/firebase'
import { ActiveStoryState } from 'utils/store'

export const useStoryHook = () => {
  const isPast1st = useRef(false)
  const [activeStory, setActiveStory] = useRecoilState(ActiveStoryState)
  const [snapshot, loading, error] = useCollectionData(query(collection(db, 'stories')))
  const updateStory = story => {
    updateFirebase('stories', story.id, story)
  }

  useEffect(() =>{
    if (error) console.error(error)
    if (snapshot) {setActiveStory(snapshot[0])
    console.log(snapshot[0])}
    // if (snapshot) {
    //   console.log(snapshot[0])
    //   const storybase = getFromFirebase('stories', activeStory.id)
    //   .then(res => console.log('res', res.document))
    //   console.log(storybase)
    //   setActiveStory(activeStory)
    // }


  },[loading])


  return {
    activeStory,
    updateStory,
  }
}

const story = {
  userId: "",
  title: "",
  position: {
    x: -1 * Math.floor(0) + 25,
    y: Math.floor(0) + 25
  }}
