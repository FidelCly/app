import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserById = async (userId: string) => {
	const url = process.env.API_URL + "/user/" + userId;

	try {
		const token = await AsyncStorage.getItem("token");
		const response = await fetch(url, {
			method: "GET",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		return response.json();
	} catch (error) {
		return error;
	}
};
