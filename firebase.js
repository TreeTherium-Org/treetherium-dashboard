import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbSH12i-KpDQqYpqJXniiAD3fyU7drJAk",
  authDomain: "treetherium.firebaseapp.com",
  projectId: "treetherium",
  storageBucket: "treetherium.appspot.com",
  messagingSenderId: "447506327762",
  appId: "1:447506327762:web:8fae710b5a698cc18a250b"
};

// Initialize Firebase app only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
