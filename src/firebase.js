
// src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-L0QYBEpmy_CmaqhckVOQb_L-a3oQheg",
  authDomain: "que-esta-pasando-aqui.firebaseapp.com",
  databaseURL: "https://que-esta-pasando-aqui.firebaseio.com",
  projectId: "que-esta-pasando-aqui",
  storageBucket: "que-esta-pasando-aqui.appspot.com",
  messagingSenderId: "783430683158",
  appId: "1:783430683158:web:d300c6a63fcad596874337",
  measurementId: "G-JK9XDDVQGK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();