import { createSlice } from "@reduxjs/toolkit";
import { addCardToWallet, updateCard } from "../../services";
import { ICardState } from "../interfaces/card.interface";

const initialCardState: ICardState = {
  cards: [],
  currentCard: null,
  cardLoader: false,
  cardError: null,
};

export const getCards = createAsyncThunk(
  CardActionTypes.GetCards,
  async (payload: any) => {
    console.warn("🚀 ~ payload:", payload);
    return await getUserCards(payload);
  }
);

export const setCard = createAsyncThunk(
  CardActionTypes.SetCard,
  async (payload: ICard) => {
    return await addCardToWallet(payload);
  }
);

export const deleteCard = createAsyncThunk(
  CardActionTypes.DeleteCard,
  async (payload: ICard) => {
    return await deleteCard(payload);
  }
);

export const cardReducer = createSlice({
	name: "cards",
	initialState: { ...initialCardState },
	reducers: {
		GetCards: (state, action) => {
			state.cards = action.payload;
		},
		SetCard: (state, action) => {
			state.cards = [...state.cards, action.payload];
			// Update Database
			addCardToWallet(action.payload);
		},
		UpdateCard: (state, action) => {
			state.cards = [state.cards.filter((c) => c.id !== action.payload.id), action.payload];
			// Update Database
			updateCard(action.payload);
		},
		DeleteCard: (state, action) => {
			state.cards = state.cards.filter((c) => c.id !== action.payload.id);
		}
	}
});

export default cardReducer.reducer;
