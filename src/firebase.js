import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Optional for analytics

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqBYkKD2DQkGgVFPNCv4X74EC5owAtpoQ",
  authDomain: "tutorial-ef3fb.firebaseapp.com",
  projectId: "tutorial-ef3fb",
  storageBucket: "tutorial-ef3fb.appspot.com", // Fixed storage bucket
  messagingSenderId: "1025165442291",
  appId: "1:1025165442291:web:5f648a8f765bda72054b86",
  measurementId: "G-Q3H97CQP1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics if needed
const analytics = getAnalytics(app);

export default app;
