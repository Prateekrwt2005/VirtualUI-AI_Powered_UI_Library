
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualui-55726.firebaseapp.com",
  projectId: "virtualui-55726",
  storageBucket: "virtualui-55726.firebasestorage.app",
  messagingSenderId: "508378821188",
  appId: "1:508378821188:web:13d2afbd0c28eaf8520211"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider(); 

export { auth, provider };