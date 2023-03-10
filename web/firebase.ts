import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr3cisa-RlamJfkyvWSmlP-1eQXPd8ohU",
  authDomain: "travel-india-b92d9.firebaseapp.com",
  projectId: "travel-india-b92d9",
  storageBucket: "travel-india-b92d9.appspot.com",
  messagingSenderId: "795977375059",
  appId: "1:795977375059:web:84725888aa5e5284f5d5a6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
