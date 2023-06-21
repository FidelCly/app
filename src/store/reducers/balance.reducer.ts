/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCardBalanceById } from "../../services/balance-service";
import { BalanceActionTypes } from "../actions/balance.actions";
import { IBalance, IBalanceState } from "../interfaces/balance.interface";

const initialBalanceState: IBalanceState = {
  currentCardBalance: {} as IBalance,
  balanceLoader: false,
};

export const getBalance = createAsyncThunk(
  BalanceActionTypes.GetBalance,
  async (payload: any) => {
    return await getCardBalanceById(payload.balanceId);
  }
);

export const balanceReducer = createSlice({
  name: "balances",
  initialState: { ...initialBalanceState },
  reducers: {
    GetBalance: (state, action) => {
      state.currentCardBalance = action.payload;
    },
  },
});

export default balanceReducer.reducer;
