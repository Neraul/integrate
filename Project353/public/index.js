// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXKMOOZH6eh5Spp_fvB-QCWgdqrxXe8Q4",
  authDomain: "integrate-30f4c.firebaseapp.com",
  databaseURL: "https://integrate-30f4c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "integrate-30f4c",
  storageBucket: "integrate-30f4c.appspot.com",
  messagingSenderId: "418219411042",
  appId: "1:418219411042:web:3dd153ef21767b97e5333b",
  measurementId: "G-WWW1SEBBB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);