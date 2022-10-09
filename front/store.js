// import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
