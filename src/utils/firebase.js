// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrHgxZR8npJXGfm6KDMPK-0XUpwVSO-Wg",
  authDomain: "gpt-netflix-6e182.firebaseapp.com",
  projectId: "gpt-netflix-6e182",
  storageBucket: "gpt-netflix-6e182.appspot.com",
  messagingSenderId: "217416748850",
  appId: "1:217416748850:web:31bb47f17ba2d47291512b",
  measurementId: "G-XEHRRYXPCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();