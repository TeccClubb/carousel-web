"use client";
import React, { FC, memo, ReactNode } from "react";
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
import { Provider } from "react-redux";
import store from "@/store/store";

const RootLayout: FC<{ children: Readonly<ReactNode> }> = ({ children }) => {
  const pathName = usePathname();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <Provider store={store}>
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
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default memo(RootLayout);
