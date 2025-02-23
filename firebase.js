//Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'

// Firebase Configuration (Replace with your project details)
const firebaseConfig = {
    apiKey: "AIzaSyDwvLDYDMBRZFW3RO3CnvLuDXPiRnR7Hes",
    authDomain: "firestream-codedealer123.firebaseapp.com",
    projectId: "firestream-codedealer123",
    storageBucket: "firestream-codedealer123.firebasestorage.app",
    messagingSenderId: "992477689322",
    appId: "1:992477689322:web:8856f9f98d28e32ef72e93"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
