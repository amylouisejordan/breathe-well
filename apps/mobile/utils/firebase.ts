import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAklF-xwtVgIgNlXb5lucaqPsuRIAMDopA",
  authDomain: "breathe-well-7ec4d.firebaseapp.com",
  projectId: "breathe-well-7ec4d",
  storageBucket: "breathe-well-7ec4d.appspot.com",
  messagingSenderId: "989117214497",
  appId: "1:989117214497:web:0a943b3f41c1f418751860",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
