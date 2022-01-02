
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


/* function to add new task to firestore */
export const AddNode = async (e, onClose) => {
  e.preventDefault()
  try {
    console.log('adding...')
    await addDoc(collection(db, 'nodes'), {
      // title: "title",
      // description: "description",
      // created: Timestamp.now()
      id: '3',
      data: { label: 'Another Node' },
      position: { x: 100, y: 125 },
    })
    onClose()
  } catch (err) {
    alert(err)
  }
}
