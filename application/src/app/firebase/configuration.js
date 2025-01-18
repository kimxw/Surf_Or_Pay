// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG-9TtjXpRzNLpz_fjgo9dQEEGyhTBSkE",
  authDomain: "surforpay.firebaseapp.com",
  projectId: "surforpay",
  storageBucket: "surforpay.firebasestorage.app",
  messagingSenderId: "277293475799",
  appId: "1:277293475799:web:7e69d4d73ee71248544d92",
  measurementId: "G-2TC30F5YHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app); //database

export { authentication, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getStorage,  sendPasswordResetEmail  };