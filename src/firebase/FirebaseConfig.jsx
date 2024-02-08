// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Update the import
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm6VVXl8FBwqajdt9deZwHWB8Lp39SwoI",
  authDomain: "init-to-winit.firebaseapp.com",
  databaseURL: "https://init-to-winit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "init-to-winit",
  storageBucket: "init-to-winit.appspot.com",
  messagingSenderId: "945273943083",
  appId: "1:945273943083:web:2483416cd0e9fe417f666e",
  measurementId: "G-BX2K1W9MTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDb=getFirestore(app);
const auth=getAuth(app);
const storage=getStorage(app);

export {fireDb,auth,storage};