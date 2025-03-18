import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/types";

const initialState: AppState = {
  zoomValue: 39,
  isLoading: false,
  isClient: false,
  loaderTitle: "Loading...",
  dashboardActiveItem: "dashboard",
};

const appSlice = createSlice({
  initialState,
  name: "app",

  reducers: {
    zoomIn: (state) => {
      const remainder = state.zoomValue % 3;
      if (state.zoomValue === 99) state.zoomValue += 1;
      else if (remainder === 0) state.zoomValue += 3;
      else state.zoomValue += 3 - remainder;
    },

    zoomOut: (state) => {
      const remainder = state.zoomValue % 3;
      if (state.zoomValue === 21) state.zoomValue -= 1;
      else if (remainder === 0) state.zoomValue -= 3;
      else state.zoomValue -= remainder;
    },

    setZoomValue: (state, action: PayloadAction<number>) => {
      state.zoomValue = action.payload > 20 ? action.payload : 20;
    },

    setLoading: (
      state,
      action: PayloadAction<{ isLoading: boolean; title?: string }>
    ) => {
      state.isLoading = action.payload.isLoading;
      state.loaderTitle = action.payload.title ?? "Loading...";
    },

    setIsClient: (state) => {
      state.isClient = true;
    },

    setDashboardActiveItem: (state, action: PayloadAction<string>) => {
      state.dashboardActiveItem = action.payload;
    },
  },
});

export const {
  zoomIn,
  zoomOut,
  setZoomValue,
  setLoading,
  setIsClient,
  setDashboardActiveItem,
} = appSlice.actions;

export default appSlice.reducer;
