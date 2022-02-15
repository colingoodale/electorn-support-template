import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/compat/messaging'

const firebaseApp = firebase.initializeApp({
  apiKey:"AIzaSyB3xin7o7otFnqM4cYz0b2qSRZm37-B3ik",
  authDomain: "support-demo-e9c2c.firebaseapp.com",
  databaseURL: "https://support-demo-e9c2c-default-rtdb.firebaseio.com/",
  projectId: "support-demo-e9c2c",
  storageBucket: "support-demo-e9c2c.appspot.com",
  messagingSenderId: "970368855512",
  appId: "1:970368855512:web:1f3504c5a8eb174dec96a",
  measurementId: "G-TMYKY2NG0Q"
});

export const messaging = firebase.messaging.isSupported() ? firebaseApp.messaging() : null

export default firebaseApp;