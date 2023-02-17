import { createSlice } from "@reduxjs/toolkit";
import { UtilityActionTypes } from "../actions/utility.actions";
import { IUtilityState } from "../interfaces/utility.interface";

const initialState: IUtilityState = {
    appLoading: false;
}

export const utilityReducer = createSlice({
    name: "utility",
    initialState: { ...initialState },
    reducers: {
        // App loader
        [UtilityActionTypes.AppLoading]: (state, action) => {
            state.appLoading = action.payload;
        }
    }
});

export default utilityReducer.reducer