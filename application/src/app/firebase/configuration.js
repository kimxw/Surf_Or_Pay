// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG-9TtjXpRzNLpz_fjgo9dQEEGyhTBSkE",
  authDomain: "surforpay.firebaseapp.com",
  projectId: "surforpay",
  storageBucket: "surforpay.appspot.com", // Updated to correct bucket
  messagingSenderId: "277293475799",
  appId: "1:277293475799:web:7e69d4d73ee71248544d92",
  measurementId: "G-2TC30F5YHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app); // database
const storage = getStorage(app); // Firebase storage

// Exporting necessary Firebase functions
export { authentication, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, storage, sendPasswordResetEmail };