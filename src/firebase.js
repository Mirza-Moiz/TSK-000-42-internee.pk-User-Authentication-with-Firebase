// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { API_KEY } from "./config";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "user-authentication-task.firebaseapp.com",
    projectId: "user-authentication-task",
    storageBucket: "user-authentication-task.appspot.com",
    messagingSenderId: "923448589020",
    appId: "1:923448589020:web:efb0c7c949f0605fe01219"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
