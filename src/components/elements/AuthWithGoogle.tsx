"use client";
import React, { FC, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { Button } from "../ui";
import { GoogleIcon } from "@/icons";
import axios from "axios";
import { setUserData } from "@/store";
import { GoogleUser } from "@/types";
import { useLoginToken } from "@/hooks";
import { Loading } from ".";

const AuthWithGoogle: FC<{ text: string }> = ({ text }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { setLoginToken } = useLoginToken();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)
      setLoginToken(tokenResponse.access_token);
      try {
        const userInfo: GoogleUser = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then((res) => res.data);

        dispatch(setUserData(userInfo));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleLogin = () => {
    // setLoading(true);
    googleLogin();
  };

  return (
    <>
      <Button
        onClick={handleLogin}
        className="w-full bg-slate-300 text-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        <GoogleIcon /> {text}
      </Button>
      {isLoading && <Loading />}
    </>
  );
};

export default AuthWithGoogle;
