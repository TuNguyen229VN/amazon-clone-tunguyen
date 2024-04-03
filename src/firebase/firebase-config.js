// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const {
  VITE_API_KEY_FIREBASE,
  VITE_AUTH_DOMAIN_FIREBASE,
  VITE_PROJECT_ID_FIREBASE,
  VITE_STORAGE_BUCKET_FIREBASE,
  VITE_MESSAGING_SENDER_ID_FIREBASE,
  VITE_APP_ID_FIREBAE,
  VITE_MEASUREMENT_ID_FIREBASE,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY_FIREBASE,
  authDomain: VITE_AUTH_DOMAIN_FIREBASE,
  projectId: VITE_PROJECT_ID_FIREBASE,
  storageBucket: VITE_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: VITE_MESSAGING_SENDER_ID_FIREBASE,
  appId: VITE_APP_ID_FIREBAE,
  measurementId: VITE_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
