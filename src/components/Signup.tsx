"use client";
import React, { FC, memo } from "react";
import { WelcomeIcon } from "@/icons";
import { Link } from "@/i18n/navigation";
import {
  PRIVACY_POLICY_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "@/pathNames";
import { AuthWithGoogle } from "./elements";
import { useTranslations } from "next-intl";

const Signup: FC = () => {
  const t = useTranslations();
  return (
    <section className="bg-gradient-to-r from-[#F0F6FD] to-[#FFFFFF] dark:bg-gradient-to-r dark:from-[#1E1E2F] dark:to-[#2D2D44] flex flex-wrap items-center justify-start bg-cover bg-center w-full min-h-[calc(100vh-4rem)]">
      <div className="w-full lg:w-7/12 lg:h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 lg:px-8 xl:px-14 gap-y-8 bg-gradient-to-b from-[#18BCEC] to-[#0139FF] pt-16">
        <h1 className="text-white text-5xl xl:text-6xl font-semibold ml-5 2xl:ml-8 2xl:mr-10">
          {t("welcome_back_to_carousel_builder")}
        </h1>
        <WelcomeIcon className="w-full h-auto" />
      </div>

      <div className="lg:w-1/12 lg:block hidden"></div>

      <div className="w-full lg:w-3/12 h-auto lg:min-h-[calc(100vh-4rem)] py-12 lg:py-0 flex flex-col items-center justify-center gap-y-4 lg:pt-16">
        <h2 className="text-gray-900 dark:text-white text-3xl font-semibold">
          {t("signup_page_heading")}
        </h2>
        <span className="text-gray-900 dark:text-white text-base font-normal">
          {t("signup_page_title")}
        </span>

        <AuthWithGoogle text="Sign Up with Google" />

        <Link
          href={SIGNUP_PAGE_PATH}
          className="text-gray-900 dark:text-white text-base font-normal"
        >
          {t("already_have_an_account_login")}
        </Link>
        <span className="text-gray-800 dark:text-white/70 text-sm font-normal text-center">
          {t("by_continuing_you_agree_to_carousel_builder")} <br />
          <Link
            href={TERMS_AND_CONDITIONS_PAGE_PATH}
            className="text-black dark:text-white"
          >
            {t("terms_and_condition")}
          </Link>
          &nbsp;{t("and")}&nbsp;
          <Link
            href={PRIVACY_POLICY_PAGE_PATH}
            className="text-black dark:text-white"
          >
            {t("privacy_policy")}
          </Link>
        </span>
      </div>
    </section>
  );
};

export default memo(Signup);
