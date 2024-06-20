// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh4ZyLyCeOtuJxzeK-3CE1lZ8cCjZRCvs",
  authDomain: "busy-buy-1ad10.firebaseapp.com",
  projectId: "busy-buy-1ad10",
  storageBucket: "busy-buy-1ad10.appspot.com",
  messagingSenderId: "127874970541",
  appId: "1:127874970541:web:159707bb776e11ee75a724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
