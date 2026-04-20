import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAklF-xwtVgIgNlXb5lucaqPsuRIAMDopA",
  authDomain: "breathe-well-7ec4d.firebaseapp.com",
  projectId: "breathe-well-7ec4d",
  storageBucket: "breathe-well-7ec4d.appspot.com",
  messagingSenderId: "989117214497",
  appId: "1:989117214497:web:0a943b3f41c1f418751860",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
