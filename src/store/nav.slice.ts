import { NavItem, NavState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const navItems: NavItem[] = [
  "ai",
  "content",
  "text",
  "colors",
  "background",
  "branding",
  "swipe",
  "order",
  "settings",
  "randomize",
  "my_carousels",
];

const initialState: NavState = {
  activeNavItem: "ai",
  navItems,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<NavItem>) => {
      state.activeNavItem = action.payload;
    },
  },
});

export const { setActiveItem } = navSlice.actions;

export default navSlice.reducer;
