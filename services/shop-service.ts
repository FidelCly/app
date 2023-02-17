import { API_URL } from "@env";

/**
 * getShopById
 * @param shopId
 * @returns
 */
export const getShopById = async (shopId: number) => {
	console.log("🚀 ~ getWalletFromApi ~ API_URL", API_URL);
	const url = API_URL + "/shops/" + shopId;
	try {
		const response = await fetch(url);
		console.log("🚀 ~ getUserById ~ response", response);
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
export const getNearShops = async (distance: number, lat: number, lng: number) => {
	const url = API_URL + `/shops/?d=${distance}&long=${lng}&lat=${lat}`;
	try {
		const response = await fetch(url);
		console.log("🚀 ~ getNearShop ~ response", response);
		return response.json();
	} catch (error) {
		return error;
	}
};
