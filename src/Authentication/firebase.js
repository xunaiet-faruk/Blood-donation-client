// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfaUaraM7RsFq5k4SRHGW5fE1lVEbVQUc",
    authDomain: "blood-donation-web-2b177.firebaseapp.com",
    projectId: "blood-donation-web-2b177",
    storageBucket: "blood-donation-web-2b177.firebasestorage.app",
    messagingSenderId: "1085987345910",
    appId: "1:1085987345910:web:6b4551bb0bb2ea222663d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
