import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNearShops, getShopById } from "../../services/shop-service";
import { ShopActionTypes } from "../actions";
import { IShop, IShopState } from "../interfaces/shop.interface";

const initialShopState: IShopState = {
	shops: [] as IShop[],
	currentShop: {} as IShop,
	shopLoader: false
};

export const getShop = createAsyncThunk(ShopActionTypes.GetShop, async (payload: any) => {
	return await getShopById(payload.userId);
});

export const getShops = createAsyncThunk(ShopActionTypes.GetNearShops, async (payload: any) => {
	return await getNearShops(payload.distance, payload.lat, payload.lng);
});

export const shopReducer = createSlice({
	name: "shops",
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
			});
	}
});

export default shopReducer.reducer;
