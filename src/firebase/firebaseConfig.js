// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(import.meta.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: "newsly-fb1f6.firebaseapp.com",
  projectId: "newsly-fb1f6",
  storageBucket: "newsly-fb1f6.firebasestorage.app",
  messagingSenderId: "23127376598",
  appId: "1:23127376598:web:7131dad4a801ca6e1e7f77",
  measurementId: "G-RM61B1Z53S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const datebase = getFirestore(app);
