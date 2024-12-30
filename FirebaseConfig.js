import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDZwtYQV-BxNXlhaOEueTNUKVjygoVNdcw",
	authDomain: "compass-3e533.firebaseapp.com",
	projectId: "compass-3e533",
	storageBucket: "compass-3e533.firebasestorage.app",
	messagingSenderId: "701153998598",
	appId: "1:701153998598:web:2c6394ba85c6952de25087",
	measurementId: "G-PXB99JLE30",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
