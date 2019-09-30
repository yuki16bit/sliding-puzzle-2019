// Firebase
import firebase from 'firebase/app';
// Firestore
import 'firebase/firestore';

const config = {
  apiKey: `${process.env.REACT_APP_FIRESTORE_API_KEY}`,
  authDomain: 'sliding-cat.firebaseapp.com',
  databaseURL: 'https://sliding-cat.firebaseio.com',
  projectId: 'sliding-cat',
  storageBucket: 'sliding-cat.appspot.com',
  messagingSenderId: '959043140910',
  appId: '1:959043140910:web:8dc53587d4189e7bd30ebf',
  measurementId: 'G-8H4FM3438V',
};

const db = firebase.initializeApp(config).firestore();

export default db;
