import { initializeApp } from "firebase/app";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOHRI0pSMhUwNnLOZ4yvoz3pVlvJcWo_w",
  authDomain: "todo-list-dstu.firebaseapp.com",
  projectId: "todo-list-dstu",
  storageBucket: "todo-list-dstu.appspot.com",
  messagingSenderId: "923160119985",
  appId: "1:923160119985:web:aa8364a25f4019e0427090",
  measurementId: "G-V02SST52ER",
};

const app = initializeApp(firebaseConfig);

export { app, auth, firestore };
