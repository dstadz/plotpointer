
import {db} from '../utils/firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


/* function to add new task to firestore */
export const AddNode = async (e, onClose) => {
  e.preventDefault()
  try {
    console.log('adding...')
    await addDoc(collection(db, 'nodes'), {
      title: "title",
      description: "description",
      completed: false,
      created: Timestamp.now()
    })
    onClose()
  } catch (err) {
    alert(err)
  }
}
