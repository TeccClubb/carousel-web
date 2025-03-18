"use client";
import { configureStore } from "@reduxjs/toolkit";
import app from "./app.slice";
import carousels from "./carousels.slice";
import plans from "./plans.slice";

const store = configureStore({
  reducer: { app, carousels, plans },
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export default store;
