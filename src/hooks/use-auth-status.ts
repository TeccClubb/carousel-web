"use client";

import { GET_USER_ROUTE, TOKEN_LOCAL_STORAGE_KEY } from "@/constant";
import { setLoading } from "@/store/app.slice";
import { RootState } from "@/store/store";
import { setOnceAppLoaded, setUserData } from "@/store/user.slice";
import { User } from "@/types";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSyncAuthStatus = () => {
  // This function sync only once when app is reload
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
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
            dispatch(setUserData({ ...resData.user, access_token: token }));
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
      dispatch(setLoading({ isLoading: false }));
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
