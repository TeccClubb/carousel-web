"use client";
import React, { FC, memo, ReactNode, useEffect } from "react";
import { CAROUSEL_GENERATOR_PAGE_PATH, DASHBOARD_PAGE_PATH } from "@/pathNames";
import Navbar from "./Navbar";
import { ScrollArea, Toaster } from "./ui";
import Footer from "./Footer";
import AiNavbar from "./AiGenerator/AiNavbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "@/constant";
import { usePathname } from "@/i18n/navigation";
import { Loader } from "./elements";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import { CookiesProvider } from "react-cookie";
import { useDispatch } from "react-redux";
import { setIsClient } from "@/store/app.slice";

const RootLayout: FC<{ children: Readonly<ReactNode> }> = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();

  useEffect(() => {
    dispatch(setIsClient());
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <CookiesProvider>
        <ScrollArea className="h-screen w-full">
          <Loader />
          {pathName === CAROUSEL_GENERATOR_PAGE_PATH && <AiNavbar />}
          {pathName === DASHBOARD_PAGE_PATH && <DashboardNavbar />}
          {pathName !== CAROUSEL_GENERATOR_PAGE_PATH &&
            pathName !== DASHBOARD_PAGE_PATH && <Navbar />}

          <main
            className={`flex-1 flex-shrink-0 ${
              pathName === CAROUSEL_GENERATOR_PAGE_PATH
                ? "min-h-[calc(100vh-4rem)]"
                : ""
            }`}
          >
            {children}
          </main>

          <Toaster
            position="bottom-center"
            expand
            visibleToasts={10}
            duration={3000}
          />
          {pathName !== CAROUSEL_GENERATOR_PAGE_PATH &&
            pathName !== DASHBOARD_PAGE_PATH && <Footer />}
        </ScrollArea>
      </CookiesProvider>
    </GoogleOAuthProvider>
  );
};

export default memo(RootLayout);
