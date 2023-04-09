import { API_URL } from "@env";

export const getCardBalanceById = async (balanceId: number) => {
	const url = API_URL + "/balances/" + balanceId;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		return error;
	}
};
