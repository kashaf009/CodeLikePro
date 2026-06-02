// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codelikepro-d0d8a.firebaseapp.com",
  projectId:import.meta.env.VITE_FIREBASE_ID ,
  storageBucket: "codelikepro-d0d8a.firebasestorage.app",
  messagingSenderId: "748718746507",
  appId: "1:748718746507:web:87db2b47c56eda58d95d8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const signInWithGoogle=()=>{
    return signInWithPopup(auth, provider)
}