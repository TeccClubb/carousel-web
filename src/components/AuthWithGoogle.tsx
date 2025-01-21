"use client";
import React, { FC } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { Button } from "./ui";
import { GoogleIcon } from "@/icons";
import axios from "axios";
import { setUserData } from "@/store";
import { GoogleUser } from "@/types";

const AuthWithGoogle: FC<{ text: string }> = ({ text }) => {
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo: GoogleUser = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then((res) => res.data);

        dispatch(setUserData(userInfo));
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Button
      onClick={() => googleLogin()}
      className="w-full bg-slate-300 text-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <GoogleIcon /> {text}
    </Button>
  );
};

export default AuthWithGoogle;
