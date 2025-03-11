"use client";
import React, { FC, memo } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui";
import { GoogleIcon } from "@/icons";
import axios, { AxiosError } from "axios";
import { User } from "@/types";
import { LOGIN_ROUTE, TOKEN_LOCAL_STORAGE_KEY } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app.slice";
import { setUserData } from "@/store/user.slice";
import { useTranslations } from "next-intl";
import { setActivePlan } from "@/store/plans.slice";

const AuthWithGoogle: FC<{ text: string }> = ({ text }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const toast = useToast();

  type LoginResponse = {
    status: boolean;
    message: string;
    user: User & {
      active_plan: {
        plan_id: number;
        amount_paid: string;
        start_date: string;
        end_date: string;
        status: "active";
      };
    };
    access_token: string;
    token_type: string;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        dispatch(setLoading({ isLoading: true, title: t("logging_in") }));
        const res: LoginResponse = await axios
          .post(LOGIN_ROUTE, {
            headers: { Accept: "application/json" },
            token: tokenResponse.access_token,
          })
          .then((res) => res.data);
        if (res.status) {
          dispatch(
            setUserData({
              name: res.user.name,
              email: res.user.email,
              avatar: res.user.avatar,
              access_token: res.access_token,
            })
          );
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, res.access_token);
          dispatch(
            setActivePlan({
              id: res.user.active_plan.plan_id,
              start_date: res.user.active_plan.start_date,
              end_date: res.user.active_plan.end_date,
              amount_paid: res.user.active_plan.amount_paid,
              status: res.user.active_plan.status,
            })
          );
        } else toast.error(res.message);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else toast.error("Something went wrong while login");
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    },
  });

  const handleLogin = () => {
    googleLogin();
  };

  return (
    <Button
      onClick={handleLogin}
      className="min-w-72 sm:min-w-96 bg-slate-300 text-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <GoogleIcon /> {text}
    </Button>
  );
};

export default memo(AuthWithGoogle);
