import type { Metadata } from "next";
import "./globals.css";
import { RootLayout } from "@/components";
import { i18nConfig } from "../../../i18nConfig";

export const metadata: Metadata = {
  title: "Carousel Web",
  description: "Generated by create next app",
};

export const generateStaticParams = () => {
  return i18nConfig.locales.map((locale) => ({ locale }));
};

export default RootLayout;
