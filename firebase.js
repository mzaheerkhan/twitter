// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-v4-e03f2.firebaseapp.com",
  projectId: "twitter-v4-e03f2",
  storageBucket: "twitter-v4-e03f2.appspot.com",
  messagingSenderId: "855038771597",
  appId: "1:855038771597:web:023f36e039e6a552b13dc4",
};

// Initialize Firebase
const app = getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default { app, db, storage };
