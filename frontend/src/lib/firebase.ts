// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjWS8dikHLcBpCTTVRgohgaw-pJtwr7mI",
  authDomain: "loanchain-523a7.firebaseapp.com",
  projectId: "loanchain-523a7",
  storageBucket: "loanchain-523a7.firebasestorage.app",
  messagingSenderId: "358387786079",
  appId: "1:358387786079:web:6cec1497b149ab811e56ea",
  measurementId: "G-FBHPBREZT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);