import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ActiveStoryState } from 'utils/store'
import { db, updateFirebase } from 'utils/firebase'
import { collection, query } from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore'

export const useStoryHook = () => {
  const [activeStory, setActiveStory] = useRecoilState(ActiveStoryState)
  const [snapshot, loading, error] = useCollectionData(query(collection(db, 'stories')))
  useEffect(() =>{
    if (error) console.error(error)
    if (snapshot) {setActiveStory(snapshot[0])}
  },[loading])

  const updateStory = story => {
    updateFirebase('stories', story.id, story)
  }

  return {
    activeStory,
    updateStory,
  }
}

// const story = {
//   userId: "",
//   title: "",
//   position: {
//     x: -1 * Math.floor(0) + 25,
//     y: Math.floor(0) + 25
//   }}
