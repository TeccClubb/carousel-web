import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useUserState = () => useSelector((state: RootState) => state.user);
