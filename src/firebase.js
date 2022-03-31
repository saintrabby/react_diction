
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBT9bJDuVumXSId7LiJurKzcL9TKi_XeRg",
  authDomain: "react-dict-e62b9.firebaseapp.com",
  projectId: "react-dict-e62b9",
  storageBucket: "react-dict-e62b9.appspot.com",
  messagingSenderId: "263084973481",
  appId: "1:263084973481:web:3b2d01f37d74bd1b0db8b8",
  measurementId: "G-XCWD5VJJ4G"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
