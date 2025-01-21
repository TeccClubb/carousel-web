"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH } from "@/pathNames";
import { useAuthStatus, useIsOnceAppLoaded } from "@/hooks";
import { Loading } from "./elements";

const Protected: FC<{ children: ReactNode; authentication: boolean }> = ({
  children,
  authentication,
}) => {
  const router = useRouter();

  const isOnceAppLoaded = useIsOnceAppLoaded();

  const { isLoading, isLoggedIn } = useAuthStatus();

  useEffect(() => {
    if (!isLoading && authentication !== isLoggedIn) {
      const redirectPath = authentication ? LOGIN_PAGE_PATH : HOME_PAGE_PATH;
      router.push(redirectPath);
    }
  }, [isLoading, isLoggedIn, authentication, router]);

  if(authentication !== isLoggedIn) {
    return <Loading />
  }
  if (isOnceAppLoaded) return <>{children}</>;
  else if (isLoading) return <Loading />;
  return <>{children}</>;
};

export default Protected;
