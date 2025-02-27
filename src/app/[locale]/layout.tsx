import React, { FC, memo, ReactNode } from "react";
import "./globals.css";
import { RootLayout as Layout } from "@/components";
import ConfigureStore from "@/store/ConfigureStore";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <ConfigureStore>
    <Layout>{children}</Layout>
  </ConfigureStore>
);

export default memo(RootLayout);
