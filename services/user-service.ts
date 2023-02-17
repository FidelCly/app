import { API_URL } from "@env";

export const getUserById = async (userId: number) => {
	console.log("🚀 ~ getWalletFromApi ~ API_URL", API_URL);
	const url = API_URL + "/users/" + userId;
	try {
		const response = await fetch(url);
		console.log("🚀 ~ getUserById ~ response", response);
		return response.json();
	} catch (error) {
		return error;
	}
};
