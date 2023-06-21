import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../services/user-service";
import { UserActionTypes } from "../actions/user.actions";
import { IUser, IUserState } from "../interfaces/user.interface";

const initialUserState: IUserState = {
	authenticated: false,
	currentUser: null,
	userLoader: false
};

export const getUser = createAsyncThunk(UserActionTypes.GetUser, async (payload: any) => {
	return await getUserById(payload);
});

export const userReducer = createSlice({
	name: "users",
	initialState: { ...initialUserState },
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state) => {
				state.userLoader = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.currentUser = action.payload as IUser;
				state.authenticated = true;
				state.userLoader = false;
			})
			.addCase(getUser.rejected, (state) => {
				state.currentUser = null;
				state.authenticated = false;
				state.userLoader = false;
			});
	}
});

export default userReducer.reducer;
