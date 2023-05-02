import { configureStore } from "@reduxjs/toolkit";
import {
  balanceReducer,
  cardReducer,
  shopReducer,
  userReducer,
  utilityReducer,
} from "./reducers";

const store = configureStore({
  reducer: {
    users: userReducer.reducer,
    cards: cardReducer.reducer,
    shops: shopReducer.reducer,
    balance: balanceReducer.reducer,
    utility: utilityReducer.reducer,
  },
});

export default store;
