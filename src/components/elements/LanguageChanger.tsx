"use client";
import React, { FC, memo } from "react";
import { Combobox, ComboboxItem } from "../ui";
import { languages } from "@/assets/languages";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "@/hooks/use-app-state";
import { Locale } from "@/types";

const LanguageChanger: FC = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const { locale } = useAppState();

  const handleChange = (newLocale: Locale) => {
    router.replace(currentPathname.replace(`/${locale}`, `/${newLocale}`));
  };

  return (
    <Combobox
      value={locale}
      onValueChange={(value) => handleChange(value as Locale)}
      text={languages.find((lang) => lang.locale === locale)?.label}
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

export default memo(LanguageChanger);
