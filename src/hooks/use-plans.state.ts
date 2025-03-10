import { useCallback, useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./use-sonner-toast";
import axios, { AxiosError } from "axios";
import { GET_PLANS_ROUTE } from "@/constant";
import { Plan } from "@/types";
import { setPlans } from "@/store/plans.slice";

export const usePlansState = () =>
  useSelector((state: RootState) => state.plans);

export const usePlans = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { plans, isPlansLoadedOnce } = useSelector(
    (state: RootState) => state.plans
  );
  const [isPlansLoading, setLoading] = useState<boolean>(true);

  const fetchPlans = useCallback(async () => {
    try {
      if (isPlansLoadedOnce) return;
      const response = await axios
        .get<{ status: boolean; plans: Plan[] }>(GET_PLANS_ROUTE)
        .then((res) => res.data);
      if (response.status) {
        dispatch(setPlans(response.plans));
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError ? error.message : "Failed to load plans"
      );
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { isPlansLoading, plans };
};
