import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * getPromotionByShopId
 * @param userId
 * @returns
 */
export const getShopPromotions = async (shopId: number) => {
	const url = process.env.API_URL + `/shop/${shopId}/promotions`;
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

export const promotionService = {
	getShopPromotions
};
