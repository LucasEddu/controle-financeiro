import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSXpfZDWhKPHgJaEKff6RjHx1dDdwfcjI",
  authDomain: "karonte-3da75.firebaseapp.com",
  projectId: "karonte-3da75",
  storageBucket: "karonte-3da75.firebasestorage.app",
  messagingSenderId: "209731006429",
  appId: "1:209731006429:web:af4b73e7adce4e9a389034",
  measurementId: "G-YQKQHJRQJG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
