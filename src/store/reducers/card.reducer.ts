import { createSlice } from "@reduxjs/toolkit";
import { ICardState } from "../interfaces/card.interface";

const initialCardState: ICardState = {
  cards: [],
  currentCard: null,
  cardLoader: false,
  cardError: null,
};

export const cardReducer = createSlice({
  name: "cards",
  initialState: { ...initialCardState },
  reducers: {
    "cards/setCards": (state, action) => {
      state.cards = action.payload;
    },
  },
});

// export generated actions
export const cardsActions = cardReducer.actions;

export default cardReducer.reducer;
