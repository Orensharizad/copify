// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ5OlHWNNcCB2P5LWkknB7TIjpOMiZGIk",
    authDomain: "copify-app.firebaseapp.com",
    projectId: "copify-app",
    storageBucket: "copify-app.appspot.com",
    messagingSenderId: "1064517671184",
    appId: "1:1064517671184:web:3a74e4102e55316092ed95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const auth = getAuth(app);


export default app;
