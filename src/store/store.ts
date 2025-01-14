import { configureStore } from "@reduxjs/toolkit";
import carousels from "./carousels.slice";

const store = configureStore({
  reducer: { carousels },
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export default store;
