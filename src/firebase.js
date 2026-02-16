import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3lghTVKCLPCB8ZWOpE7D6khnv7VQ59_8",
  authDomain: "water-works-15086.firebaseapp.com",
  projectId: "water-works-15086",
  storageBucket: "water-works-15086.firebasestorage.app",
  messagingSenderId: "883260931965",
  appId: "1:883260931965:web:bd212089525eed6c3c9614"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider;
