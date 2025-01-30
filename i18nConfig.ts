import { languages } from "@/assets/languages";
import { Config } from "next-i18n-router/dist/types";

const i18nConfig: Config = {
  locales: [...languages.map((lang) => lang.locale)],
  defaultLocale: "en",
  prefixDefault: true,
};

export { i18nConfig };
