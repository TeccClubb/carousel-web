import { Metadata } from "next";
import React, { FC, memo, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Carousel Builder",
  description: "Generated by create next app",
  icons:"/logo.svg"
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export default memo(RootLayout);
