"use client";
import React, { FC } from "react";
import { Combobox, ComboboxItem } from "../ui";
import { languages } from "@/assets/languages";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { i18nConfig } from "../../../i18nConfig";
import { useCurrentLocale } from "next-i18n-router/client";

const LanguageChanger: FC = () => {
  const currentLocale = useCurrentLocale(i18nConfig) ?? "en";
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `CAROUSAL_WEB_LOCALE=${newLocale};expires=${expires};path=/`;
    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }
    router.refresh();
  };

  return (
    <Combobox
      value={currentLocale}
      onValueChange={handleChange}
      text={languages.find((lang) => lang.locale === currentLocale)?.label}
      tickSide="left"
      icon={<Languages className="h-5 w-5" />}
      emptyMessage="No language found"
      placeholder="Select Language"
      size="sm"
    >
      {languages.map((lang) => (
        <ComboboxItem key={lang.locale} value={lang.locale}>
          {lang.name}
          <span className="text-xs text-gray-500">&nbsp;({lang.label})</span>
        </ComboboxItem>
      ))}
    </Combobox>
  );
};

export default LanguageChanger;
