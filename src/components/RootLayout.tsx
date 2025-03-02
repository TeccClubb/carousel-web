"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { CAROUSEL_GENERATOR_PAGE_PATH, DASHBOARD_PAGE_PATH } from "@/pathNames";
import { Geist, Geist_Mono } from "next/font/google";
import { setLocale } from "@/store/app.slice";
import Navbar from "./Navbar";
import { ScrollArea, Toaster } from "./ui";
import Footer from "./Footer";
import AiNavbar from "./AiGenerator/AiNavbar";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "@/constant";
import { usePathname } from "@/hooks/use-path-name";
import { Locale } from "@/types";
import { Loader } from "./elements";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import { locales } from "@/assets/languages";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout: FC<{ children: Readonly<ReactNode> }> = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { locale } = useParams();

  console.log("RootLayout");

  useEffect(() => {
    dispatch(setLocale(locale as Locale));
  }, [dispatch, locale]);

  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  return (
    <html lang={locale as Locale}>
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased overflow-hidden bg-white dark:bg-gray-900 bg-background w-full min-h-screen ${
          pathName === CAROUSEL_GENERATOR_PAGE_PATH ? "flex flex-col" : ""
        } transition duration-300`}
      >
        <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
          <ScrollArea className="h-screen w-full">
            <Loader />
            {pathName === CAROUSEL_GENERATOR_PAGE_PATH && <AiNavbar />}
            {pathName === DASHBOARD_PAGE_PATH && <DashboardNavbar />}
            {pathName !== CAROUSEL_GENERATOR_PAGE_PATH &&
              pathName !== DASHBOARD_PAGE_PATH && <Navbar />}

              <main
                className={`flex-1 flex-shrink-0 ${pathName === CAROUSEL_GENERATOR_PAGE_PATH
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
        </GoogleOAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
