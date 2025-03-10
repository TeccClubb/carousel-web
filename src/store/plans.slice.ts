import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan, PlansState } from "@/types";
import { ActivePlan } from "@/types/plans.state";

const initialState: PlansState = {
  isPlansLoadedOnce: false,
  plans: [],
  activePlan: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setActivePlan: (state, action: PayloadAction<ActivePlan>) => {
      state.activePlan = action.payload;
    },

    setPlans: (state, action: PayloadAction<Plan[]>) => {
      state.isPlansLoadedOnce = true;
      state.plans = action.payload;
    },
  },
});

export const { setActivePlan, setPlans } = plansSlice.actions;

export default plansSlice.reducer;
