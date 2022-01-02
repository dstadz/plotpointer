import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export const handleDelete = async () => {
  const taskDocRef = doc(db, 'tasks', id)
  try{
    await deleteDoc(taskDocRef)
  } catch (err) {
    alert(err)
  }
}
