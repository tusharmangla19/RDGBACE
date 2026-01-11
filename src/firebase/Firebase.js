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
	apiKey: "AIzaSyBBx54nlMhqoEvw4dt5fqfIRB4WDHf4MHY",
	authDomain: "iyf-sadhana.firebaseapp.com",
	projectId: "iyf-sadhana",
	storageBucket: "iyf-sadhana.firebasestorage.app",
	messagingSenderId: "819660354644",
	appId: "1:819660354644:web:d656f01a906fc6937269c1",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, collection, addDoc, getDocs, query, where, updateDoc, doc };
