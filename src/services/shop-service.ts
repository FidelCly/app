import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getShopById
 * @param shopId
 * @returns
 */
export const getShopById = async (shopId: number) => {
	const url = process.env.API_URL + "/shop/" + shopId;
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

/**
 * getAllShops
 * @returns
 */
export const getAllShops = async () => {
	const url = process.env.API_URL + "/shop/";
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

/**
 *getNearShop
 * @param distance
 * @param lat
 * @param lng
 * @returns
 */
export const getNearShops = async (distance: number, lat: number, lng: number, activity?: string, active?: boolean) => {
	const token = await AsyncStorage.getItem("token");

	const url = process.env.API_URL + `/shop/?distance=${distance}&long=${lng}&lat=${lat}`;
	if (activity) {
		url.concat(`&activity=${activity}`);
	}
	if (active) {
		url.concat(`&isActive=${active}`);
	}

	try {
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
