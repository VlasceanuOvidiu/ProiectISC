import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyACgeULq9ph_jUyaUg8cCnTeFS8OAmimmg",
  authDomain: "healthmonitordb.firebaseapp.com",
  projectId: "healthmonitordb",
  storageBucket: "healthmonitordb.appspot.com",
  messagingSenderId: "172037577773",
  appId: "1:172037577773:web:dafae1672ab33c06a2aca4"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }