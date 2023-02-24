import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({

    //prod

//   apiKey: "AIzaSyDIC0tDbmEfvIBWIKYOz0vEezoMhvPqsXw",
//   authDomain: "exercise-tracker-19107.firebaseapp.com",
//   projectId: "exercise-tracker-19107",
//   storageBucket: "exercise-tracker-19107.appspot.com",
//   messagingSenderId: "742737267159",
//   appId: "1:742737267159:web:ed987e56a2c6240a876392",
  
  //dev

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
