import React, { FC, memo, ReactNode } from "react";
import "./globals.css";
import { RootLayout as Layout } from "@/components";
import { i18nConfig } from "../../../i18nConfig";
import ConfigureStore from "@/store/ConfigureStore";

export const generateStaticParams = () =>
  i18nConfig.locales.map((locale) => ({ locale }));

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <ConfigureStore>
    <Layout>{children}</Layout>
  </ConfigureStore>
);

export default memo(RootLayout);
