"use client";
import React, { FC, memo, useTransition } from "react";
import { Combobox, ComboboxItem } from "../ui/combobox";
import { languages } from "@/assets/languages";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { useParams } from "next/navigation";
import Image from "next/image";

const LanguageChanger: FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const language = languages.find((lang) => lang.locale === locale)!;

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
      text={language.label}
      tickSide="left"
      icon={
        <Image
          src={`/flags/${language.flagCode}.png`}
          alt="logo"
          width={100}
          height={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={`/flags/${language.flagCode}.png`}
          className="size-5 rounded-full"
        />
      }
      emptyMessage="No language found"
      placeholder={t("select_language")}
      size="sm"
      disabled={isPending}
    >
      {languages.map((lang) => (
        <ComboboxItem key={lang.locale} value={lang.locale}>
          <span className="flex items-center gap-2">
            <Image
              src={`/flags/${lang.flagCode}.png`}
              alt="logo"
              width={100}
              height={100}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={`/flags/${lang.flagCode}.png`}
              className="size-5 rounded-full"
            />
            {lang.name}
            <span className="text-xs text-gray-500">({lang.label})</span>
          </span>
        </ComboboxItem>
      ))}
    </Combobox>
  );
};

export default memo(LanguageChanger);
