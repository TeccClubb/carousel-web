import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useNavState = () => useSelector((state: RootState) => state.nav);

export const useActiveNavItem = () =>
  useSelector((state: RootState) => state.nav.activeNavItem);

export const useColors = () =>
  useSelector((state: RootState) => state.nav.colors);
