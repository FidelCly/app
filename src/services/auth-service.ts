import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
	const url = API_URL + "/auth/login";
	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		});
		console.warn("🚀 ~ login ~ response:", response);
		return response.json();
	} catch (error) {
		return error;
	}
};

export const register = async (email: string, password: string) => {
	console.warn("🚀 ~ register ~ email and password:", email, password);
	const url = API_URL + "/auth/register";
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		console.warn("🚀 ~ register ~ response:", response);
		return response.json();
	} catch (error) {
		console.error("🚀 ~ register ~ error:", error);
		return error;
	}
};

export const authGuard = async () => {
	const url = API_URL + "/auth";
	try {
		const token = AsyncStorage.getItem("token");
		if (!token) return false;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		console.warn("🚀 ~ authGuard ~ response:", response);
		return true;
	} catch (error) {
		return error;
	}
};
