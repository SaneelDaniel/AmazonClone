// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBvPmbvSBIhVptOShR7-ZJFAE4MrDtLuHU",
    authDomain: "react-ecom-template.firebaseapp.com",
    projectId: "react-ecom-template",
    storageBucket: "react-ecom-template.appspot.com",
    messagingSenderId: "550217949988",
    appId: "1:550217949988:web:01cc71999103f6bd3a09b1",
    measurementId: "G-C70TYSL8RW"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();


  export {db, auth};