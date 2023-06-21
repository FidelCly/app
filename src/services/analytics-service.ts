import * as Analytics from "expo-firebase-analytics";

export const loginLog = async () => {
	try {
		await Analytics.logEvent("Login", {
			screen: "Login",
			purpose: "Login",
			userId: null
		});
	} catch (error) {
		console.log("🚀 ~ login ~ error:", error);
	}
};
