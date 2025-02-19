"use client";
import { configureStore } from "@reduxjs/toolkit";
import app from "./app.slice";
import user from "./user.slice";
import carousels from "./carousels.slice";

const store = configureStore({
  reducer: { app, user, carousels },
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export default store;
