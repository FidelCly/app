export const getCardBalanceById = async (balanceId: number) => {
	const url = process.env.API_URL + "/balances/" + balanceId;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		return error;
	}
};
