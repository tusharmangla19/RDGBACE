import { initializeApp } from "firebase/app";
import {
	getMessaging,
	getToken,
	onMessage,
	isSupported,
} from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyBBx54nlMhqoEvw4dt5fqfIRB4WDHf4MHY",
	authDomain: "iyf-sadhana.firebaseapp.com",
	projectId: "iyf-sadhana",
	storageBucket: "iyf-sadhana.firebasestorage.app",
	messagingSenderId: "819660354644",
	appId: "1:819660354644:web:d656f01a906fc6937269c1",
};

const firebaseApp = initializeApp(firebaseConfig);

export async function requestNotificationPermission() {
	try {
		const supported = await isSupported();
		if (!supported) {
			console.warn("This browser does not support Firebase Messaging.");
			return null;
		}

		const messaging = getMessaging(firebaseApp);
		const token = await getToken(messaging, { vapidKey: "<Your-VAPID-Key>" });
		return token;
	} catch (error) {
		console.error("Error during notification permission request:", error);
		throw error;
	}
}

export function onMessageListener() {
	return new Promise((resolve, reject) => {
		isSupported().then((supported) => {
			if (supported) {
				const messaging = getMessaging(firebaseApp);
				onMessage(messaging, (payload) => {
					resolve(payload);
				});
			} else {
				reject(new Error("Browser does not support Firebase Messaging."));
			}
		});
	});
}
