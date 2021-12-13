import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAZSj7e-i2BQPtU7zMq8WZLkRU8Osg4od4",
  authDomain: "newsapp-a70b3.firebaseapp.com",
  projectId: "newsapp-a70b3",
  storageBucket: "newsapp-a70b3.appspot.com",
  messagingSenderId: "82761005198",
  appId: "1:82761005198:web:999db99a06b1741df371df",
};

firebase.initializeApp(config);

export default firebase;
