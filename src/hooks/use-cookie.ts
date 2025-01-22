"use client"
import { useCookies } from "react-cookie";
import { LOGIN_TOKEN_COOKIE_KEY } from "@/constant";

// export const useCookie = (name: string) => {
//   const [cookies, setCookie, removeCookie] = useCookies([name]);

//   const updateCookie = (value: string, options?: object) => {
//     setCookie(name, value, options);
//   };

//   const deleteCookie = () => {
//     removeCookie(name);
//   };

//   return [cookies[name], updateCookie, deleteCookie] as const;
// };

export const useLoginToken = () => {
  const [loginCookie, setCookie, removeCookie] = useCookies([
    LOGIN_TOKEN_COOKIE_KEY,
  ]);

  const setLoginToken = (token: string) => {
    setCookie(LOGIN_TOKEN_COOKIE_KEY, token, {
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: true,
      sameSite: "strict",
    });
  };

  const removeLoginToken = () => {
    removeCookie(LOGIN_TOKEN_COOKIE_KEY);
  };

  return { loginCookie, setLoginToken, removeLoginToken } as const;
};

// import { LOGIN_TOKEN_COOKIE_KEY } from "@/constant";
// import { useState } from "react";

// const getCookie = (name: string): string | null => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
//   return null;
// };

// const setCookie = (name: string, value: string, days: number) => {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${name}=${encodeURIComponent(
//     value
//   )}; expires=${expires}; path=/`;
// };

// const deleteCookie = (name: string) => {
//   setCookie(name, "", -1);
// };

// export const useCookie = (name: string, defaultValue?: string) => {
//   const [cookie, setCookieState] = useState(
//     () => getCookie(name) || defaultValue
//   );

//   const updateCookie = (value: string, days: number = 365) => {
//     setCookie(name, value, days);
//     setCookieState(value);
//   };

//   const removeCookie = () => {
//     deleteCookie(name);
//     setCookieState(defaultValue);
//   };

//   return [cookie, updateCookie, removeCookie] as const;
// };

// export const useLoginCookie = () => {
//     const [cookie, setCookie, removeCookie] = useCookie(LOGIN_TOKEN_COOKIE_KEY);

//     const setLoginToken = () => {
//         setCookie(LOGIN_TOKEN_COOKIE_KEY, 1);
//     };

//     const removeLoginToken = () => {
//         removeCookie();
//     };

//     return [cookie, setLoginToken, removeLoginToken] as const;
// };
