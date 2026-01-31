import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCESOrPHPzhQqvuPMg_mRNpX6UjMSPTmiM",
  authDomain: "biggestpetshop-9a46e.firebaseapp.com",
  projectId: "biggestpetshop-9a46e",
  storageBucket: "biggestpetshop-9a46e.firebasestorage.app",
  messagingSenderId: "124009626913",
  appId: "1:124009626913:web:b45cf93e3194da6037d260",
  measurementId: "G-B212E5D5NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
