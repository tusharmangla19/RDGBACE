import { getMessaging, getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
	try {
		const messaging = getMessaging();
		// Replace with your Firebase Console Web Push Certificate Key
		const vapidKey =
			"BMyqPARxtUNUTC3Y_7f7fD-ep9am5c0hveROoM2-3PkfcH-g0oydmcCxgoHtWXElXtYxjQ7JQ6j6ZVoKmEZMwEs";

		const token = await getToken(messaging, { vapidKey });
		if (token) {
			return token; // Successfully retrieved the FCM token
		} else {
			console.log(
				"No registration token available. Request permission to generate one."
			);
			return null;
		}
	} catch (error) {
		console.error("Error while getting the FCM token:", error);
		throw error;
	}
};
