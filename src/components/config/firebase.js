// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxOzyicNWycN2Mfw5bIHRq6wFoZcUXhCM",
  authDomain: "my-project-react-404702.firebaseapp.com",
  projectId: "my-project-react-404702",
  storageBucket: "my-project-react-404702.appspot.com",
  messagingSenderId: "150803132670",
  appId: "1:150803132670:web:49fd2b43951ddc9cb135af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
