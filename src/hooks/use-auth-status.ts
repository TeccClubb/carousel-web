import { useState, useEffect } from "react";
import { useIsOnceAppLoaded, useLoginStatus } from "./use-carousels-state";
import axios from "axios";
import { GoogleUser } from "@/types";
import { useDispatch } from "react-redux";
import { setOnceAppLoaded, setUserData } from "@/store";
import { useLoginToken } from "./use-cookie";

export const useAuthStatus = () => {
  const dispatch = useDispatch();
  const isOnceAppLoaded = useIsOnceAppLoaded();
  const [isLoading, setLoading] = useState<boolean>(true);
  const isLoggedIn = useLoginStatus();
  const { loginCookie } = useLoginToken();

  useEffect(() => {
    const loggingIn = async () => {
      try {
        const userInfo: GoogleUser = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${loginCookie.carousel_login_token_cookie_key}`,
            },
          })
          .then((res) => res.data);

        dispatch(setUserData(userInfo));
      } catch (error) {
        console.error("Failed to check auth status", error);
      } finally {
        setLoading(false);
        dispatch(setOnceAppLoaded());
      }
    };

    if (!isOnceAppLoaded) {
      if (loginCookie.carousel_login_token_cookie_key) {
        loggingIn();
      } else {
        setLoading(false);
        dispatch(setOnceAppLoaded());
      }
    } else {
      setLoading(false);
      dispatch(setOnceAppLoaded());
    }
  }, [loginCookie, isOnceAppLoaded, dispatch]);

  return { isLoading, isLoggedIn };
};
