// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tweetly-d034a.firebaseapp.com",
  projectId: "tweetly-d034a",
  storageBucket: "tweetly-d034a.firebasestorage.app",
  messagingSenderId: "84636690944",
  appId: "1:84636690944:web:92960551ace6f5d74386e5",
  measurementId: "G-5TLJ6N18K8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
