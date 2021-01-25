import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

var firebaseConfig = {
  apiKey: "AIzaSyDFgGnRJYUvvWVWYYzhedbCW1tPjuiMjGE",
  authDomain: "ozen-stream.firebaseapp.com",
  databaseURL: "https://ozen-stream.firebaseio.com",
  projectId: "ozen-stream",
  storageBucket: "ozen-stream.appspot.com",
  messagingSenderId: "1024871920165",
  appId: "1:1024871920165:web:6c93269671d28486d185cc",
  measurementId: "G-2M6Z8B7DDK"
};
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth()
const firestore = firebase.firestore()
const admin = firebase
const storage = firebase.storage()
const functions = firebase.functions()
//functions.useFunctionsEmulator('http://localhost:5001')


export {
  auth, firestore, admin, storage, functions
}
