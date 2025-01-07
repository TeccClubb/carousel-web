import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useSlideState = () =>
  useSelector((state: RootState) => state.slide);

export const useActiveRatioId = () =>
  useSelector((state: RootState) => state.slide.activeRatioId);

export const useRatios = () =>
  useSelector((state: RootState) => state.slide.ratios);
