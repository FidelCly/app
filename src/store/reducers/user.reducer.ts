import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../services/user-service";
import { UserActionTypes } from "../actions/user.actions";
import { IUser, IUserState } from "../interfaces/user.interface";

const initialUserState: IUserState = {
  authenticated: false,
  currentUser: null,
  userLoader: false,
};

export const getUser = createAsyncThunk(UserActionTypes.GetUser, async (payload: any) => {
	console.log("🚀 ~ getUser ~ payload:", payload);
	return await getUserById(payload);
});

// user reducer with createSlice
export const userReducer = createSlice({
	name: "users",
	initialState: { ...initialUserState },
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state, action) => {
				state.userLoader = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.currentUser = action.payload as IUser;
				console.warn("🚀 ~ .addCase ~ state.currentUser:", state.currentUser);
				state.authenticated = true;
				state.userLoader = false;
				// Dispatch all users related datas
				if (state.currentUser && state.currentUser !== null) {
					// store.dispatch(GetCards(state.currentUser.id));
					// store.dispatch(GetBalance(state.currentUser.id));
				}
			})
			.addCase(getUser.rejected, (state, action) => {
				state.currentUser = null;
				state.authenticated = false;
				state.userLoader = false;
			});
	}
});

export default userReducer.reducer;
