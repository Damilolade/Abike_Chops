import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC4fzPcEycaxbC9UqvjYTO3Ikw5SK99Qk",
  authDomain: "abike-chops.firebaseapp.com",
  projectId: "abike-chops",
  storageBucket: "abike-chops.firebasestorage.app",
  messagingSenderId: "718169313248",
  appId: "1:718169313248:web:797087d2b3d485ab9e2585",
  measurementId: "G-1RNV50PH6P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
