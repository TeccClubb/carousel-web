import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, Locale } from "@/types";

const initialState: AppState = {
  locale: "en",
  zoomValue: 39,
  isLoading: true,
  loaderTitle: "Loading...",
  dashboardActiveItem: "dashboard",
};

const appSlice = createSlice({
  initialState,
  name: "app",

  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },

    zoomIn: (state) => {
      state.zoomValue += 3;
    },

    zoomOut: (state) => {
      state.zoomValue -= 3;
    },

    setLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean; title?: string }>
    ) => {
      state.isLoading = action.payload.isLoading;
      state.loaderTitle = action.payload.title ?? "Loading...";
    },

    setDashboardActiveItem: (state, action: PayloadAction<string>) => {
      state.dashboardActiveItem = action.payload;
    },
  },
});

export const { setLocale, zoomIn, zoomOut, setLoading, setDashboardActiveItem } = appSlice.actions;

export default appSlice.reducer;
