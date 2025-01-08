import { NavItem, NavState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavState = {
  activeNavItem: "ai",
  colors: {
    backgroundColor: "#160910",
    textColor: "#e7d8c7",
    accentColor: "#ef922d",
  },
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<NavItem>) => {
      state.activeNavItem = action.payload;
    },

    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.colors.backgroundColor = action.payload;
    },

    setTextColor: (state, action: PayloadAction<string>) => {
      state.colors.textColor = action.payload;
    },

    setAccentColor: (state, action: PayloadAction<string>) => {
      state.colors.accentColor = action.payload;
    },

    setColors: (state, action: PayloadAction<typeof initialState.colors>) => {
      state.colors = action.payload;
    },
  },
});

export const {
  setActiveItem,
  setBackgroundColor,
  setTextColor,
  setAccentColor,
  setColors,
} = navSlice.actions;

export default navSlice.reducer;
