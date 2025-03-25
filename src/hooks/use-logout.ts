"use client";
import { googleLogout } from "@react-oauth/google";
import { useToast } from "@/hooks/use-sonner-toast";
import {
  useActivePlanCookie,
  useAffiliateUserCookie,
  useUserCookie,
} from "@/hooks/use-cookie";
import axios, { AxiosError } from "axios";
import { AFFILIATE_LOGOUT_ROUTE, LOGOUT_ROUTE } from "@/constant";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app.slice";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export const useLogout = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const { user, removeUserCookie } = useUserCookie();
  const { affiliateUser, removeAffiliateUserCookie } = useAffiliateUserCookie();
  const { removeActivePlanCookie } = useActivePlanCookie();
  const toast = useToast();
  const handleUserLogout = async () => {
    try {
      dispatch(setLoading({ isLoading: true, title: t("signing_out") }));
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
        removeUserCookie();
        removeActivePlanCookie();
      } else toast.error(res.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else toast.error("Something went wrong while logout");
    } finally {
      dispatch(setLoading({ isLoading: false }));
      removeUserCookie();
      removeActivePlanCookie();
    }
  };

  const handleAffiliateUserLogout = async () => {
    try {
      dispatch(setLoading({ isLoading: true, title: t("signing_out") }));
      const res = await axios
        .post<{ status: boolean; message: string }>(
          AFFILIATE_LOGOUT_ROUTE,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${affiliateUser.access_token}`,
            },
          }
        )
        .then((res) => res.data);
      if (res.status) {
        toast.success(res.message);
        // removeAffiliateUserCookie();
        // router.refresh();
      } else toast.error(res.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else toast.error("Something went wrong while logout");
    } finally {
      dispatch(setLoading({ isLoading: false }));
      removeAffiliateUserCookie();
      router.refresh();
    }
  };

  return { handleUserLogout, handleAffiliateUserLogout };
};
