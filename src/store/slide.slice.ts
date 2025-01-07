import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ratio, RatioId, SlideState } from "@/types";

export const ratios: Ratio[] = [
  {
    id: "linkedIn1",
    name: "LinkedIn (4:5)",
    width: 4,
    height: 5,
  },
  {
    id: "linkedIn2",
    name: "LinkedIn (1:1)",
    width: 1,
    height: 1,
  },
  {
    id: "InstaFeed1",
    name: "Insta Feed (4:5)",
    width: 4,
    height: 5,
  },

  {
    id: "InstaFeed2",
    name: "Insta Feed (1:1)",
    width: 1,
    height: 1,
  },
  {
    id: "InstaStories",
    name: "Insta Stories (9:16)",
    width: 9,
    height: 16,
  },
  {
    id: "tikTok",
    name: "TikTok (9:16)",
    width: 9,
    height: 16,
  },
];

const initialState: SlideState = {
  activeRatioId: "linkedIn1",
  slideWidth: 4,
  slideHeight: 5,
  ratios,
};

const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setActiveRatioId: (state, action: PayloadAction<RatioId>) => {
      state.activeRatioId = action.payload;
    },
  },
});

export const { setActiveRatioId } = slideSlice.actions;

export default slideSlice.reducer;
