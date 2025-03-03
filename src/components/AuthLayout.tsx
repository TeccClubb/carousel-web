"use client";
import React, { FC, memo, ReactNode, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH } from "@/pathNames";
import { useSyncAuthStatus } from "@/hooks/use-auth-status";

const Protected: FC<{ children: ReactNode; authentication: boolean }> = ({
  children,
  authentication,
}) => {
  const router = useRouter();
  const { isLoading, isOnceAppLoaded, isLoggedIn } = useSyncAuthStatus();

  useEffect(() => {
    if (!isLoading) {
      if (authentication !== isLoggedIn) {
        const redirectPath = authentication
          ? LOGIN_PAGE_PATH
          : HOME_PAGE_PATH;
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
