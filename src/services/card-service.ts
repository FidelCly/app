import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICard } from "store/interfaces";

export const getCardById = async (cardId: number) => {
  const url = process.env.API_URL + "/card/" + cardId;
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

/**
 * getUserCards
 * @param userId
 * @returns
 */
export const getUserCards = async () => {
  const url = process.env.API_URL + "/user/cards";
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
export const addCardToWallet = async (shopId: number) => {
  const url = process.env.API_URL + "/card";
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shopId: shopId,
      }),
    });

    if (response.status !== 201) {
      // throw new Error((httpErrorMessages as any)?.[response.status] || "Une erreur est survenue");
    }

    return response.json();
  } catch (error) {
    return error;
  }
};

// update card
export const updateCard = async (card: ICard) => {
  const url = process.env.API_URL + "/card";

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(card),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

/**
 * deleteCard
 * @param cardId
 */
export const deleteCard = async (cardId: number) => {
  const url = process.env.API_URL + "/card" + cardId;

  try {
    const token = await AsyncStorage.getItem("token");
    await fetch(url, {
      method: "DELETE",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const cardService = {
  getCardById,
  getUserCards,
  addCardToWallet,
  updateCard,
  deleteCard,
};
