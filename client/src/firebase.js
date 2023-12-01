// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-94a3b.firebaseapp.com",
  projectId: "mern-auth-94a3b",
  storageBucket: "mern-auth-94a3b.appspot.com",
  messagingSenderId: "410684919891",
  appId: "1:410684919891:web:f57692aa78ece9decab6a6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
