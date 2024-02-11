// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
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

onAuthStateChanged(auth, (user) => {
  console.log('Auth state changed:', user);

  // You can handle authentication state changes here
  // For example, you might update your application state, navigate to different pages, etc.

  // Check if the user is authenticated
  if (user) {
    // User is signed in
    console.log('User is authenticated:', user);
    // You can do further handling, such as updating your application state
    // Example: setUserState(user);
  } else {
    // User is signed out
    console.log('User is not authenticated');
    // You can do further handling, such as updating your application state
    // Example: setUserState(null);
  }
});
export {fireDb,auth,storage};