import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useCarouselsState = () =>
  useSelector((state: RootState) => state.carousels);

export const useColors = () =>
  useSelector((state: RootState) => state.carousels.colors);

export const useBrand = () =>
  useSelector((state: RootState) => state.carousels.brand);

export const useBackgroundOverlay = () =>
  useSelector((state: RootState) => state.carousels.backgroundOverlay);

export const useSettings = () =>
  useSelector((state: RootState) => state.carousels.settings);
