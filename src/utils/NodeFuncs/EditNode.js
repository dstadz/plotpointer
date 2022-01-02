
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'


export const handleUpdate = async (e, {
  id,
  title,
  description,
  postTryFunc,
}) => {
  e.preventDefault()
  const nodeDocRef = doc(db, 'nodes', id)
  console.log(nodeDocRef)
  try{
    await updateDoc(taskDocRef, {
      title: title,
      description: description
    })
    postTryFunc()
  } catch (err) {
    alert(err)
  }
}
