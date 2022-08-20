// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCAfoG-OoiPvqSf9pbJb5hx60XaxQJTP08",
    authDomain: "aliment-ed1f6.firebaseapp.com",
    projectId: "aliment-ed1f6",
    storageBucket: "aliment-ed1f6.appspot.com",
    messagingSenderId: "802730013719",
    appId: "1:802730013719:web:c630fec022988435f11852"
  };

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const fireStore = getFirestore(app);
const storage = getStorage(app);

// const auth = getAuth(app);


export  {app, fireStore, storage,};