"use client";
import React, { FC, ReactNode } from "react";
import { notFound, useParams } from "next/navigation";
import { CAROUSEL_GENERATOR_PATH, DASHBOARD_PAGE_PATH } from "@/pathNames";
import { Geist, Geist_Mono } from "next/font/google";
import store from "@/store";
import Navbar from "./Navbar";
import { Toaster } from "./ui";
import Footer from "./Footer";
import AiNavbar from "./AiGenerator/AiNavbar";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "@/constant";
import { usePathname } from "@/hooks";
import TranslationsProvider from "./TranslationsProvider";
import { i18nConfig } from "../../i18nConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout: FC<{ children: Readonly<ReactNode> }> = ({ children }) => {
  const pathName = usePathname();
  const { locale } = useParams();
  if (!i18nConfig.locales.includes(locale as string)) {
    notFound();
  }
  return (
    <html lang={locale as string}>
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased bg-white dark:bg-gray-900 bg-background w-full min-h-screen ${
          pathName === CAROUSEL_GENERATOR_PATH ? "flex flex-col" : ""
        } transition duration-300`}
      >
        <Provider store={store}>
          <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
            <TranslationsProvider
              locale={locale as string}
              namespaces={["common"]}
            >
              {pathName === CAROUSEL_GENERATOR_PATH && <AiNavbar />}
              {pathName !== CAROUSEL_GENERATOR_PATH &&
                pathName !== DASHBOARD_PAGE_PATH && <Navbar />}

              {pathName === DASHBOARD_PAGE_PATH ? (
                <>{children}</>
              ) : (
                <main
                  className={`flex-1 flex-shrink-0 ${
                    pathName === CAROUSEL_GENERATOR_PATH
                      ? "min-h-[calc(100vh-4rem)]"
                      : ""
                  }`}
                >
                  {children}
                </main>
              )}
              <Toaster />
              {pathName !== CAROUSEL_GENERATOR_PATH &&
                pathName !== DASHBOARD_PAGE_PATH && <Footer />}
            </TranslationsProvider>
          </GoogleOAuthProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
