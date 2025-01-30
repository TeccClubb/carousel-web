"use client";

import React, { FC, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import initTranslations from "@/app/i18n";
import { createInstance } from "i18next";
import { Resource } from "i18next";

const TranslationsProvider: FC<{
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource
}> = ({ children, locale, namespaces, resources }) => {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
