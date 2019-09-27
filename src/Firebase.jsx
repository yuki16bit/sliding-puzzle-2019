import Firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyCIcUn_fvnZHigAe7VWOX9CcxLwWcGs_yU',
  authDomain: 'sliding-cat.firebaseapp.com',
  databaseURL: 'https://sliding-cat.firebaseio.com',
  projectId: 'sliding-cat',
  storageBucket: 'sliding-cat.appspot.com',
  messagingSenderId: '959043140910',
  appId: '1:959043140910:web:8dc53587d4189e7bd30ebf',
  measurementId: 'G-8H4FM3438V',
};

Firebase.initializeApp(config);

export default Firebase;
