import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
import {
  userReducer,
  cardReducer,
  shopReducer,
  balanceReducer,
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
