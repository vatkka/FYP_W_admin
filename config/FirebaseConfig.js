// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "finalyearproject-4337c.firebaseapp.com",
  projectId: "finalyearproject-4337c",
  storageBucket: "finalyearproject-4337c.firebasestorage.app",
  messagingSenderId: "318053659242",
  appId: "1:318053659242:web:e961c842b8893dbaf45013",
  measurementId: "G-33LFJHSLXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);