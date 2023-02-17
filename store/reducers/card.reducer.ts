import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCardToWallet, getUserCards } from "../../services/card-service";
import { CardActionTypes } from "../actions/card.actions";
import { ICard, ICardState } from "../interfaces/card.interface";

const initialCardState: ICardState = {
	cards: [],
	currentCard: null,
	cardLoader: false,
	cardError: null
};

export const getCards = createAsyncThunk(CardActionTypes.GetCards, async (payload: any) => {
	return await getUserCards(payload.userId);
});

export const setCard = createAsyncThunk(CardActionTypes.SetCard, async (payload: ICard) => {
	return await addCardToWallet(payload);
});

export const deleteCard = createAsyncThunk(CardActionTypes.DeleteCard, async (payload: ICard) => {
	return await deleteCard(payload);
});

export const cardReducer = createSlice({
	name: "cards",
	initialState: { ...initialCardState },
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCards.pending, (state, action) => {
				state.cardLoader = true;
			})
			.addCase(getCards.fulfilled, (state, action) => {
				state.cards = action.payload;
				state.cardLoader = false;
			})
			.addCase(getCards.rejected, (state, action) => {
				state.currentCard = null;
				(state.cards = action.payload as ICard[]), (state.cardLoader = false);
			})
			.addCase(setCard.pending, (state, action) => {
				state.cardLoader = true;
			})
			.addCase(setCard.fulfilled, (state, action) => {
				state.currentCard = action.payload;
				state.cards = [...state.cards, action.payload];
				state.cardLoader = false;
			})
			.addCase(setCard.rejected, (state, action) => {
				state.currentCard = null;
				state.cardError = action.error.message;
				state.cardLoader = false;
			})
			.addCase(deleteCard.pending, (state, action) => {
				state.cardLoader = true;
			})
			.addCase(deleteCard.fulfilled, (state, action) => {
				state.currentCard = null;
				state.cards = state.cards.filter((card) => card.id !== action.payload.id);
				state.cardLoader = false;
			})
			.addCase(deleteCard.rejected, (state, action) => {
				state.currentCard = state.currentCard;
				state.cardError = action.error.message;
				state.cardLoader = false;
			});
	}
});

export default cardReducer.reducer;
