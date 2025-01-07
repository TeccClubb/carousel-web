import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./slider.slice";
import slideReducer from "./slide.slice";
import navReducer from "./nav.slice";

const store = configureStore({
  reducer: { slider: sliderReducer, slide: slideReducer, nav: navReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export default store;
