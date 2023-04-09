import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNearShops, getShopById } from "../../services";
import { ShopActionTypes } from "../actions";
import { IShop, IShopState } from "../interfaces/shop.interface";

const initialShopState: IShopState = {
	shops: [] as IShop[],
	currentShop: {} as IShop,
	shopLoader: false,
	shopError: null
};

export const getShop = createAsyncThunk(ShopActionTypes.GetShop, async (payload: any) => {
	return await getShopById(payload);
});

export const getShops = createAsyncThunk(ShopActionTypes.GetNearShops, async (payload: any) => {
	return await getNearShops(payload.distance, payload.lat, payload.lng);
});

export const shopReducer = createSlice({
	name: "shop",
	initialState: { ...initialShopState },
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getShops.pending, (state, action) => {
				state.shopLoader = true;
			})
			.addCase(getShops.fulfilled, (state, action) => {
				state.shops = action.payload;
				state.shopLoader = false;
			})
			.addCase(getShops.rejected, (state, action) => {
				state.shops = state.shops;
				state.shopLoader = false;
				state.shopError = action.error.message;
			})
			.addCase(getShop.pending, (state, action) => {
				state.shopLoader = true;
			})
			.addCase(getShop.fulfilled, (state, action) => {
				state.currentShop = action.payload;
				state.shopLoader = false;
			})
			.addCase(getShop.rejected, (state, action) => {
				state.currentShop = state.currentShop;
				state.shopLoader = false;
				state.shopError = action.error.message;
			});
	}
});

export default shopReducer.reducer;
