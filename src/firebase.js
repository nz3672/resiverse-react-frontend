// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS3WbbZwRTpe59y5D6KZDIXU5EznsvTec",
  authDomain: "resiverse-fcm.firebaseapp.com",
  projectId: "resiverse-fcm",
  storageBucket: "resiverse-fcm.appspot.com",
  messagingSenderId: "977822048316",
  appId: "1:977822048316:web:bb0c2daff7ee7ad358a339",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const notificationDB = getFirestore(app);

export { messaging, notificationDB };
