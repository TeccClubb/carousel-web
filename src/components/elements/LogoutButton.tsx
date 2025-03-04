"use client";
import React, { FC, memo } from "react";
import { Button } from "../ui";
import { googleLogout } from "@react-oauth/google";
import { useToast } from "@/hooks/use-sonner-toast";
import { useUserState } from "@/hooks/use-user-state";
import axios, { AxiosError } from "axios";
import { LOGOUT_ROUTE, TOKEN_LOCAL_STORAGE_KEY } from "@/constant";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app.slice";
import { useTranslations } from "next-intl";

const LogoutButton: FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { userData: user } = useUserState();
  type LogoutResponse = { status: boolean; message: string };
  const toast = useToast();
  const handleLogout = async () => {
    try {
      dispatch(setLoading({ isLoading: true, title: t("logging_out") }));
      googleLogout();
      const res: LogoutResponse = await axios
        .post(LOGOUT_ROUTE, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        })
        .then((res) => res.data);
      if (res.status) {
        toast.success(res.message);
      } else toast.error(res.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else toast.error("Something went wrong while logout");
    } finally {
      dispatch(setLoading({ isLoading: false }));
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      if (onLogout) onLogout();
    }
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      {t("logout")}
    </Button>
  );
};

export default memo(LogoutButton);
