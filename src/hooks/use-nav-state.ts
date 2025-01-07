import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useNavState = () => useSelector((state: RootState) => state.nav);

export const useNavItems = () =>
  useSelector((state: RootState) => state.nav.navItems);

export const useActiveNavItem = () =>
  useSelector((state: RootState) => state.nav.activeNavItem);
