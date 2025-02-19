"use client";
import React, { FC, memo, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH } from "@/pathNames";
import { useAppState } from "@/hooks/use-app-state";
import { useSyncAuthStatus } from "@/hooks/use-auth-status";

const Protected: FC<{ children: ReactNode; authentication: boolean }> = ({
  children,
  authentication,
}) => {
  const router = useRouter();
  const { locale } = useAppState();
  const { isLoading, isOnceAppLoaded, isLoggedIn } = useSyncAuthStatus();

  useEffect(() => {
    if (!isLoading) {
      if (authentication !== isLoggedIn) {
        const redirectPath = authentication
          ? `/${locale}${LOGIN_PAGE_PATH}`
          : `${HOME_PAGE_PATH}${locale}`;
        router.push(redirectPath);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, authentication, router, isOnceAppLoaded]);

  if (isOnceAppLoaded) {
    return <>{children}</>;
  } else if (isLoading) {
    return <></>;
  }
  return <>{children}</>;
};

export default memo(Protected);
