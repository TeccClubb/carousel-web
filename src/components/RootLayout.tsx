"use client";
import React, { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CAROUSEL_GENERATOR_PATH, DASHBOARD_PAGE_PATH } from "@/pathNames";
import { Geist, Geist_Mono } from "next/font/google";
import store from "@/store";
import Navbar from "./Navbar";
import { Toaster } from "./ui";
import Footer from "./Footer";
import AiNavbar from "./AiGenerator/AiNavbar";
import { Provider } from "react-redux";

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
  return pathName === CAROUSEL_GENERATOR_PATH ? (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 bg-background w-full min-h-screen flex flex-col transition duration-300`}
      >
        <Provider store={store}>
          <AiNavbar />
          <main className="flex-1 flex-shrink-0 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  ) : pathName === DASHBOARD_PAGE_PATH ? (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 bg-background w-full min-h-screen transition duration-300`}
      >
        <Provider store={store}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  ) : (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 w-full min-h-screen flex flex-col transition duration-300`}
      >
        <Provider store={store}>
          <Navbar />
          <main className="flex-1 flex-shrink-0">{children}</main>
          <Toaster />
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
