"use client";

import {
  GET_ACTIVE_PURCHASE_PLAN_ROUTE,
  GET_USER_ROUTE,
  TOKEN_LOCAL_STORAGE_KEY,
} from "@/constant";
import { setActivePlan } from "@/store/plans.slice";
import { RootState } from "@/store/store";
import { setOnceAppLoaded, setUserData } from "@/store/user.slice";
import { User } from "@/types";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSyncAuthStatus = () => {
  // This function sync only once when app is reload
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isOnceAppLoaded, userData } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();
  const fetchUserData = useCallback(async (): Promise<void> => {
    try {
      if (!isOnceAppLoaded) {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token !== null && token !== "[]") {
          const resData = await axios
            .get<{ status: boolean; user: User }>(GET_USER_ROUTE, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => res.data);
          if (resData) {
            const planResData = await axios
              .get<{
                status: boolean;
                message: string;
                plan: {
                  plan_id: number;
                  start_date: string;
                  end_date: string;
                  amount_paid: string;
                  status: "active";
                };
              }>(GET_ACTIVE_PURCHASE_PLAN_ROUTE, {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => res.data);
            dispatch(setUserData({ ...resData.user, access_token: token }));
            dispatch(
              setActivePlan({
                id: planResData.plan.plan_id,
                start_date: planResData.plan.start_date,
                end_date: planResData.plan.end_date,
                amount_paid: planResData.plan.amount_paid,
                status: planResData.plan.status,
              })
            );
          } else {
            dispatch(setOnceAppLoaded());
            localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
          }
        } else dispatch(setOnceAppLoaded());
      }
    } catch (error) {
      dispatch(setOnceAppLoaded());
      if (error instanceof AxiosError) {
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    user: userData,
    isOnceAppLoaded,
    isLoading,
    isLoggedIn: userData !== null,
  };
};
