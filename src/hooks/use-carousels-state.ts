import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useCarouselsState = () =>
  useSelector((state: RootState) => state.carousels);
