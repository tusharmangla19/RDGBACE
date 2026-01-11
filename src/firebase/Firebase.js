import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	where,
	updateDoc,
	doc,
} from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyC3albtx4MfEWtFQBQWuHcrJZSGPymLWgY",
  authDomain: "sadhana-app-slate.firebaseapp.com",
  projectId: "sadhana-app-slate",
  storageBucket: "sadhana-app-slate.firebasestorage.app",
  messagingSenderId: "524576731723",
  appId: "1:524576731723:web:ac4c9dc357caaa5d9013ce"	
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, collection, addDoc, getDocs, query, where, updateDoc, doc };
