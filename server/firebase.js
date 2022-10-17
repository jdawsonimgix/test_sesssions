const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "pre-testing-sessions-upload.firebaseapp.com",
  projectId: "pre-testing-sessions-upload",
  storageBucket: "pre-testing-sessions-upload.appspot.com",
  messagingSenderId: "565208581389",
  appId: "1:565208581389:web:d4def059a3edc0d9a2dc44",
  measurementId: "G-477W2EFM8C",
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);
