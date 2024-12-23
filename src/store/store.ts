import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./sliderSlice";

const store = configureStore({
  reducer: { slider: sliderReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export default store;
