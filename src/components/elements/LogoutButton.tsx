"use client";
import React, { FC, memo, ReactNode } from "react";
import { Button } from "../ui";
import { googleLogout } from "@react-oauth/google";
import { useToast } from "@/hooks/use-sonner-toast";
import { useActivePlanCookie, useUserCookie } from "@/hooks/use-cookie";
import axios, { AxiosError } from "axios";
import { LOGOUT_ROUTE } from "@/constant";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app.slice";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { HOME_PAGE_PATH } from "@/pathNames";

const LogoutButton: FC<{
  className?: string;
  onLogout?: () => void;
  children: ReactNode;
}> = ({ className, onLogout, children }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const { user, removeUserCookie } = useUserCookie();
  const { removeActivePlanCookie } = useActivePlanCookie();
  const toast = useToast();
  const handleLogout = async () => {
    try {
      dispatch(setLoading({ isLoading: true, title: t("logging_out") }));
      googleLogout();
      const res = await axios
        .post<{ status: boolean; message: string }>(
          LOGOUT_ROUTE,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        )
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
      removeUserCookie();
      removeActivePlanCookie();
      router.replace(HOME_PAGE_PATH);
      if (onLogout) onLogout();
    }
  };

  return (
    <Button onClick={handleLogout} variant="destructive" className={className}>
      {children}
    </Button>
  );
};

export default memo(LogoutButton);
