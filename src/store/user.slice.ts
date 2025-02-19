import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

const initialState: { isOnceAppLoaded: boolean; userData: User | null } = {
  isOnceAppLoaded: false,
  userData: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setOnceAppLoaded: (state) => {
      state.isOnceAppLoaded = true;
    },

    setUserData: (state, action: PayloadAction<User | null>) => {
      state.isOnceAppLoaded = true;
      state.userData = action.payload;
    },
  },
});

export const { setOnceAppLoaded, setUserData } = userSlice.actions;

export default userSlice.reducer;
