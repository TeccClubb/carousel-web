"use client";
import React, { FC, memo, useTransition } from "react";
import { Combobox, ComboboxItem } from "../ui";
import { languages } from "@/assets/languages";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { useParams } from "next/navigation";

const LanguageChanger: FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const handleChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <Combobox
      value={locale}
      onValueChange={(value) => handleChange(value as Locale)}
      text={languages.find((lang) => lang.locale === locale)?.label}
      tickSide="left"
      icon={<Languages className="h-5 w-5" />}
      emptyMessage="No language found"
      placeholder={t("select_language")}
      size="sm"
      disabled={isPending}
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
