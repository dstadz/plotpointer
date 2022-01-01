// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

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
const db = getFirestore(app)

export {db}
