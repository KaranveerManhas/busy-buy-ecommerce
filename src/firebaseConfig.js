// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-shu8hLdIlIUtdym7DXdlwbNQHv4PivI",
  authDomain: "busy-buy-dfbf3.firebaseapp.com",
  projectId: "busy-buy-dfbf3",
  storageBucket: "busy-buy-dfbf3.appspot.com",
  messagingSenderId: "539949537922",
  appId: "1:539949537922:web:cf9e2d1398c5cd25a8f29b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;