import { API_URL } from "@env";
import { ICard } from "../store/interfaces";

/**
 * getUserCards
 * @param userId
 * @returns
 */
export const getUserCards = async (userId: number) => {
	const url = API_URL + "/users/" + userId + "/wallet/";
	try {
		const response = await fetch(url);
		console.log("🚀 ~ getUserCards ~ response", response);
		return response.json();
	} catch (error) {
		return error;
	}
};

/**
 * addCardToWallet
 * @param card
 * @returns
 */
export const addCardToWallet = async (card: ICard) => {
	const url = API_URL + "/cards";

	try {
		const response = await fetch(url, {
			method: "POST",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify(card)
		});
		console.log("🚀 ~ addCardToWal ~ data", response);
		return response.json();
	} catch (error) {
		console.log("🚀 ~ addCardToWal ~ error", error);
	}
};

/**
 * deleteCard
 * @param cardId
 */
export const deleteCard = async (cardId: number) => {
	const url = API_URL + "/cards" + cardId;

	try {
		await fetch(url, {
			method: "DELETE",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		});
	} catch (error) {
		console.log("🚀 ~ deleteCard ~ error", error);
	}
};
