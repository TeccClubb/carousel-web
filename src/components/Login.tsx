"use client";
import React, { FC } from "react";
import { WelcomeIcon } from "@/icons";
import Link from "next/link";
import {
  PRIVACY_POLICY_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "@/pathNames";
import { AuthWithGoogle } from "./elements";
import { useTranslation } from "react-i18next";

const Login: FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-r from-[#F0F6FD] to-[#FFFFFF] dark:bg-gradient-to-r dark:from-[#1E1E2F] dark:to-[#2D2D44] flex flex-wrap items-center justify-start bg-cover bg-center w-full min-h-[calc(100vh-4rem)]">
      <div className="w-full lg:w-7/12 lg:h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 lg:px-8 xl:px-14 gap-y-8 bg-gradient-to-b from-[#18BCEC] to-[#0139FF] pt-16">
        <h1 className="text-white text-5xl xl:text-6xl font-semibold ml-5 2xl:ml-8 2xl:mr-10">
          {t("welcome")}&nbsp;Pixmart
        </h1>
        <WelcomeIcon className="w-full h-auto" />
      </div>

      <div className="lg:w-1/12 lg:block hidden"></div>

      <div className="w-full lg:w-3/12 h-auto lg:min-h-[calc(100vh-4rem)] py-12 lg:py-0 flex flex-col items-center justify-center gap-y-4 lg:pt-16">
        <h2 className="text-gray-900 dark:text-white text-3xl font-semibold">
          {t("login_title")}
        </h2>
        <span className="text-gray-900 dark:text-white text-base font-normal">
          {t("login_description")}
        </span>

        <AuthWithGoogle text={t("google_login_btn_text")} />

        <Link
          href={SIGNUP_PAGE_PATH}
          className="text-gray-900 dark:text-white text-base font-normal"
        >
          {t("do_not_have_account_message")}
        </Link>
        <span className="text-gray-800 dark:text-white/70 text-sm font-normal text-center">
          {t("footer_message")}&nbsp;Pixmart <br />
          <Link
            href={TERMS_AND_CONDITIONS_PAGE_PATH}
            className="text-black dark:text-white"
          >
            {t("term_of_conditions")}
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

export default Login;
