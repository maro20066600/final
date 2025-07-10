import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfHXCfwwvjdvEz61Clnu6EOgueea5b8Mw",
  authDomain: "final-38035.firebaseapp.com",
  projectId: "final-38035",
  storageBucket: "final-38035.firebasestorage.app",
  messagingSenderId: "976761069820",
  appId: "1:976761069820:web:190f89647ddef1e3203779",
  measurementId: "G-KBRFJF8L70",
  databaseURL: "https://final-38035-default-rtdb.firebaseio.com" // Adding databaseURL for Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Realtime Database
const database = getDatabase(app);

export { database, analytics }; 