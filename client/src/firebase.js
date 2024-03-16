// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./firebase-config";


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);