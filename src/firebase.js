import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "mj-scoreboard.firebaseapp.com",
  databaseURL: "https://mj-scoreboard.firebaseio.com",
  projectId: "mj-scoreboard",
  storageBucket: "mj-scoreboard.appspot.com",
  messagingSenderId: "3716289166",
  appId: "1:3716289166:web:597dee87a3669d1dfdefdf",
  measurementId: "G-FGVHKZXNW0"
};

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;

export const firebaseDB = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseGoogleAuth = new firebase.auth.GoogleAuthProvider();
