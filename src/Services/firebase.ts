// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "griha-409515.firebaseapp.com",
    projectId: "griha-409515",
    storageBucket: "griha-409515.appspot.com",
    messagingSenderId: "438285272408",
    appId: "1:438285272408:web:837d2d3ee45290875fd12d",
    measurementId: "G-YW2L6F4637",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
