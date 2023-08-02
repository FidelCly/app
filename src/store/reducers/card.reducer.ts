import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserCards } from "../../services";
import { CardActionTypes } from "../actions/card.actions";
import { ICard, ICardState } from "../interfaces/card.interface";

const initialCardState: ICardState = {
  cards: [],
  currentCard: null,
  cardLoader: false,
  cardError: null,
};

export const getCards = createAsyncThunk(
  CardActionTypes.GetCards,
  async (payload: any) => {
    const data = await getUserCards(payload);

    return data;
  }
);

export const cardReducer = createSlice({
  name: "cards",
  initialState: { ...initialCardState },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCards.pending, (state) => {
        state.cardLoader = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload as ICard[];
        state.cardLoader = false;
      })
      .addCase(getCards.rejected, (state) => {
        state.cardLoader = false;
      });
  },
});

export default cardReducer.reducer;
