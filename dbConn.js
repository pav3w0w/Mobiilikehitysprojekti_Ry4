
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAC3NHzinTvS9NPCcTMorjGG6tRb4vRk4U",
    authDomain: "foorumi-f4a71.firebaseapp.com",
    projectId: "foorumi-f4a71",
    storageBucket: "foorumi-f4a71.appspot.com",
    messagingSenderId: "999023517255",
    appId: "1:999023517255:web:d3dad88abf5adcb4d5db62",
    measurementId: "G-MV1BM4R4SC"
};


// Initialize Firebase

export const db = initializeApp(firebaseConfig);
