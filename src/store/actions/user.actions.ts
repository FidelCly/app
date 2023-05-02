// action types with react/redux/toolkit
export enum UserActionTypes {
  // Get user
  GetUser = "user/GetUser",
  GetUserSuccess = "user/GetUserSuccess",
  GetUserFailure = "user/GetUserFailure",

  // Login user
  LoginUser = "user/LoginUser",
  LoginUserSuccess = "user/LoginSuccess",
  LoginUserFailure = "user/LoginFailure",

  // Logout user
  LogoutUser = "user/LogoutUser",
  LogoutUserSuccess = "user/LogoutUserSuccess",
  LogoutUserFailure = "user/LogoutUserFailure",

  // Update user
  UpdateUser = "user/UpdateUser",
  UpdateUserSuccess = "user/UpdateUserSuccess",
  UpdateUserFailure = "user/UpdateUserFailure",

  // Delete user => when use decide to delete his account
  DeleteUser = "user/DeleteUser",
  DeleteUserSuccess = "user/DeleteUserSuccess",
  DeleteUserFailure = "user/DeleteUserFailure",
}
