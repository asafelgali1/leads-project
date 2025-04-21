import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoFGULGMcgT9neqXyPuGvSMd0Mov9kShk",
  authDomain: "leads-project-43444.firebaseapp.com",
  projectId: "leads-project-43444",
  storageBucket: "leads-project-43444.appspot.com",
  messagingSenderId: "990450708253",
  appId: "1:990450708253:web:6e2945430eba290c08fbf4",
  measurementId: "G-BBD76MN4J7"
};

// את זה לא חובה אם אתה לא משתמש באנליטיקס באתר
const app = initializeApp(firebaseConfig);

// הוספה של Firestore
const db = getFirestore(app);

export { db };
