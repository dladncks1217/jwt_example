import { createSlice } from "@reduxjs/toolkit";
import { signUpAction } from "../actions/auth";
import { loginAction, getUserDataAction } from "../actions/auth";

const initialState = {
  nick: "",
  role: "",
  userId: "",
  isLoggingIn: false,
  isSigningUp: false,
  isSignedUp: false,
  signUpErrorReason: "",
  isLoggedIn: false,
  authErrorReason: "",
  getUserErrorReason: "",
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpAction.pending](state, action) {
      state.isSigningUp = true;
    },
    [signUpAction.fulfilled](state, action) {
      state.isSignedUp = true;
      state.isSigningUp = false;
    },
    [signUpAction.rejected](state, action) {
      state.isSigningUp = false;
      state.signUpErrorReason = action.error;
    },
    [loginAction.pending](state, action) {
      state.isLoggingIn = true;
    },
    [loginAction.fulfilled](state, action) {
      const data = action.payload;
      // state.user = data.user;
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      // state.isAdmin = data.user.isAdmin;
    },
    [loginAction.rejected](state, action) {
      state.isLoggingIn = false;
      state.authErrorReason = action.error;
    },
    [getUserDataAction.pending](state, action) {
      // 받아오는중
    },
    [getUserDataAction.fulfilled](state, action) {
      console.log(action);
      if (action.payload) {
        state.userId = action.payload.data.userId;
        state.nick = action.payload.data.nick;
        state.role = action.payload.data.role;
        state.isLoggedIn = true;
      }
    },
    [getUserDataAction.rejected](state, action) {
      state.getUserErrorReason = action.error;
    },
  },
});

export default authSlice;