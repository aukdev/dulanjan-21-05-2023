// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7Iv2wssnjrU_SUNLTF7HwP5RkZB4bUxM",
  authDomain: "new-class-auk.firebaseapp.com",
  projectId: "new-class-auk",
  storageBucket: "new-class-auk.appspot.com",
  messagingSenderId: "811776585850",
  appId: "1:811776585850:web:cfadade5f1b07e78ca8bc3",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
const db = getFirestore(app);

export default db;
