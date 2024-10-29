// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY5zdmvdK02fs4WLD8Z4m8GUYrLbMRBwU",
  authDomain: "centralizedhospitalmanagement.firebaseapp.com",
  projectId: "centralizedhospitalmanagement",
  storageBucket: "centralizedhospitalmanagement.appspot.com",
  messagingSenderId: "894402798499",
  appId: "1:894402798499:web:655cdc520f0d685f9cf016",
  measurementId: "G-C8BQHSRXGZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);