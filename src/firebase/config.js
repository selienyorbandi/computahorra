import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "computahorra.firebaseapp.com",
  databaseURL: "https://computahorra-default-rtdb.firebaseio.com",
  projectId: "computahorra",
  storageBucket: "computahorra.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

export default function getFirestoreApp() {
  return app;
}
export function getFirestoreAuth() {
  return getAuth(app);
}