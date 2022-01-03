// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-2NyTtP0aii5ugqIpegJtbxeh80csnGE",
  authDomain: "plotliner-cffa6.firebaseapp.com",
  databaseURL: "https://plotliner-cffa6-default-rtdb.firebaseio.com",
  projectId: "plotliner-cffa6",
  storageBucket: "plotliner-cffa6.appspot.com",
  messagingSenderId: "391415316432",
  appId: "1:391415316432:web:26877733f89de4742143d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)



/* function to add new task to firestore */
export const addToFirebase = async (
  // e,
  collectionId,
  content,
  //onClose callback
  ) => {
  // const { id, name, description, position, data } = content
  // e.preventDefault()
  try {
    console.log('adding...')
    await addDoc(collection(db, collectionId ), {
      created: Timestamp.now(),

      ...content
    })
    // onClose()
  } catch (err) { alert(err) }
}


export const deleteFromFirebase = async (collectionId, contentId) => {
  const taskDocRef = doc(db, collectionId, contentId)
  try{
    console.log('deleting...')

    await deleteDoc(taskDocRef)
  } catch (err) {
    alert(err)
  }
}


export const updateFirebase = async  (collectionId, contentId, content)  => {
  // e.preventDefault()
  const idDocRef = doc(db, collectionId, contentId)
  console.log(idDocRef)
  try{
    console.log('updating...')
    await updateDoc(idDocRef, content)
    // postTryFunc()
  } catch (err) {
    alert(err)
  }
}
