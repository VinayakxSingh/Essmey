import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRSMKefqwExHOEJWZlDDY5sBE_3yrPv1Y",
  authDomain: "essmey-4697e.firebaseapp.com",
  databaseURL: "https://essmey-4697e-default-rtdb.firebaseio.com",
  projectId: "essmey-4697e",
  storageBucket: "essmey-4697e.firebasestorage.app",
  messagingSenderId: "636456838839",
  appId: "1:636456838839:web:72566c256296830fd24f32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
