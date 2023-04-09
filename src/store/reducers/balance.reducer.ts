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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBalance.pending, (state, action) => {
        state.balanceLoader = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.currentCardBalance = action.payload;
        state.balanceLoader = false;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.currentCardBalance = {} as IBalance;
        state.balanceLoader = false;
      });
  },
});

export default balanceReducer.reducer;
