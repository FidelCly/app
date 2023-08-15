/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllShops, getNearShops, getShopById } from "../../services";
import { ShopActionTypes } from "../actions";
import { IShop, IShopState } from "../interfaces/shop.interface";

const initialShopState: IShopState = {
	allShops: [],
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

export const getAllShop = createAsyncThunk(ShopActionTypes.GetAllShops, async () => {
	return await getAllShops();
});

export const shopReducer = createSlice({
	name: "shop",
	initialState: { ...initialShopState },
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllShop.pending, (state) => {
				state.shopLoader = true;
			})
			.addCase(getAllShop.fulfilled, (state, action) => {
				state.allShops = action.payload;
				state.shopLoader = false;
			})
			.addCase(getAllShop.rejected, (state, action) => {
				state.shopLoader = false;
				state.shopError = action.error.message as string;
			})
			.addCase(getShops.pending, (state) => {
				state.shopLoader = true;
			})
			.addCase(getShops.fulfilled, (state, action) => {
				state.shops = action.payload;
				state.shopLoader = false;
			})
			.addCase(getShops.rejected, (state, action) => {
				state.shopLoader = false;
				state.shopError = action.error.message as string;
			})
			.addCase(getShop.pending, (state) => {
				state.shopLoader = true;
			})
			.addCase(getShop.fulfilled, (state, action) => {
				state.currentShop = action.payload;
				state.shopLoader = false;
			})
			.addCase(getShop.rejected, (state, action) => {
				state.shopLoader = false;
				state.shopError = action.error.message as string;
			});
	}
});

export default shopReducer.reducer;
