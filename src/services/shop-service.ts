/**
 * getShopById
 * @param shopId
 * @returns
 */
export const getShopById = async (shopId: number) => {
	const url = process.env.API_URL + "/shop/" + shopId;
	try {
		const response = await fetch(url);
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
	const url = process.env.API_URL + `/shop/?distance=${distance}&long=${lng}&lat=${lat}`;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		return error;
	}
};
