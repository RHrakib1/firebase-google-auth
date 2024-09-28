// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2ER7Xr7xJobcRJxsU_Nx3yAmBaEQiqsg",
  authDomain: "user-login-3d531.firebaseapp.com",
  projectId: "user-login-3d531",
  storageBucket: "user-login-3d531.appspot.com",
  messagingSenderId: "66114409465",
  appId: "1:66114409465:web:69768a06c0521224802328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;