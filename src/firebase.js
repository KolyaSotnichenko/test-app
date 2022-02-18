// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN8iXHeSFn5Ndlvw0ra5_icI06Ph-lAy0",
  authDomain: "test-2d035.firebaseapp.com",
  projectId: "test-2d035",
  storageBucket: "test-2d035.appspot.com",
  messagingSenderId: "521620490337",
  appId: "1:521620490337:web:cd135fee9fca671e128220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth