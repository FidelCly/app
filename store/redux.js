import { configureStore } from "@reduxjs/toolkit";
import { balanceReducer, cardReducer, shopReducer, userReducer, utilityReducer } from "./reducers";

export const store = configureStore({
	reducer: {
		users: userReducer,
		cards: cardReducer,
		shops: shopReducer,
		balance: balanceReducer,
		utility: utilityReducer
	}
});
