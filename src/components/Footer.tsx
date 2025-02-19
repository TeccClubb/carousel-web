"use client";
import React, { FC, memo } from "react";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  LogoIcon,
  XTwitterIcon,
} from "@/icons";
import {
  FACEBOOK_CAROUSEL_GENERATE_URL,
  INSTAGRAM_CAROUSEL_GENERATE_URL,
  LINKEDIN_BANNER_GENERATE_URL,
  LINKEDIN_CAROUSEL_GENERATE_URL,
  LINKEDIN_POST_IMAGE_GENERATE_URL,
  TIKTOK_CAROUSEL_GENERATE_URL,
  TWITTER_CAROUSEL_GENERATE_URL,
} from "@/links";
import {
  ABOUT_US_PAGE_PATH,
  BLOG_ARTICLES_PAGE_PATH,
  BLOG_PAGE_PATH,
  CREATORS_PAGE_PATH,
  FEATURES_PAGE_PATH,
  HOME_PAGE_PATH,
  PRIVACY_POLICY_PAGE_PATH,
  REFUND_POLICY_PAGE_PATH,
  SITE_MAP_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "@/pathNames";
import { useTranslation } from "react-i18next";
import { useAppState } from "@/hooks/use-app-state";

const FooterSlice: FC<{
  title: string;
  links: { text: string; href: string }[];
}> = ({ title, links = [] }) => (
  <div className="w-full md:w-1/3 sm:w-1/2">
    <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-6">
      {title}
    </h3>
    <ul role="list" className="mt-6 list-none">
      {links.map((link) => (
        <li key={link.href} className="mb-4">
          <Link
            href={link.href}
            target={
              link.href.startsWith("https://") ||
              link.href.startsWith("http://")
                ? "_blank"
                : "_self"
            }
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm leading-6"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: FC = () => {
  const { t } = useTranslation();
  const { locale } = useAppState();

  const socialIconSize = "1.5em";

  const socialIcons = [
    {
      href: FACEBOOK_CAROUSEL_GENERATE_URL,
      icon: <FacebookIcon size={socialIconSize} />,
    },
    {
      href: TWITTER_CAROUSEL_GENERATE_URL,
      icon: <XTwitterIcon size={socialIconSize} />,
    },
    {
      href: INSTAGRAM_CAROUSEL_GENERATE_URL,
      icon: <InstagramIcon size={socialIconSize} />,
    },
    {
      href: LINKEDIN_CAROUSEL_GENERATE_URL,
      icon: <LinkedInIcon size={socialIconSize} />,
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-[#F0F6FD] dark:from-[#2D2D44] to-transparent">
      {/*bg-white dark:bg-gray-900*/}
      <div className="max-w-7xl mx-auto pb-8 pt-16 sm:pt-24 md:pt-32 sm:px-6 md:px-8 px-4">
        <div className="flex flex-wrap flex-col lg:flex-row gap-y-4">
          <div className="w-full lg:w-3/5 flex flex-wrap mt-16 lg:mt-0 px-4 lg:px-0 order-2 lg:order-1">
            <FooterSlice
              title={t("products")}
              links={[
                {
                  text: `Linkedin ${t("carousel_generate")}`,
                  href: LINKEDIN_CAROUSEL_GENERATE_URL,
                },
                {
                  text: `TikTok ${t("carousel_generate")}`,
                  href: TIKTOK_CAROUSEL_GENERATE_URL,
                },
                {
                  text: `Instagram ${t("carousel_generate")}`,
                  href: INSTAGRAM_CAROUSEL_GENERATE_URL,
                },
                {
                  text: `Facebook ${t("carousel_generate")}`,
                  href: FACEBOOK_CAROUSEL_GENERATE_URL,
                },
              ]}
            />
            <FooterSlice
              title={t("free_tools")}
              links={[
                {
                  text: `Linkedin ${t("banner_generate")}`,
                  href: LINKEDIN_BANNER_GENERATE_URL,
                },
                {
                  text: `Linkedin ${t("post_image_generate")}`,
                  href: LINKEDIN_POST_IMAGE_GENERATE_URL,
                },
                {
                  text: "Homepage v3",
                  href: `${HOME_PAGE_PATH}${locale}`,
                },
                {
                  text: t("about_us"),
                  href: `/${locale}${ABOUT_US_PAGE_PATH}`,
                },
                {
                  text: t("creators"),
                  href: `/${locale}${CREATORS_PAGE_PATH}`,
                },
                {
                  text: t("blog_articles"),
                  href: `/${locale}${BLOG_ARTICLES_PAGE_PATH}`,
                },
              ]}
            />
            <FooterSlice
              title={t("resources")}
              links={[
                {
                  text: t("blog"),
                  href: `/${locale}${BLOG_PAGE_PATH}`,
                },
                {
                  text: t("features"),
                  href: `/${locale}${FEATURES_PAGE_PATH}`,
                },
                {
                  text: t("refund_policy"),
                  href: `/${locale}${REFUND_POLICY_PAGE_PATH}`,
                },
              ]}
            />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-y-4 items-center justify-center lg:items-start lg:justify-start px-4 order-1 lg:order-2">
            <LogoIcon className="w-56 h-auto" />
            <p className="text-gray-600 text-sm leading-6 space-y-8">
              {t("footer_description")}
            </p>
            <div className="flex gap-x-6">
              {socialIcons.map((socialIcon) => (
                <Link
                  key={socialIcon.href}
                  href={socialIcon.href}
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {socialIcon.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black dark:bg-gray-800">
        <div className="w-full max-w-7xl mx-auto p-4 flex items-center justify-center md:justify-between flex-col md:flex-row gap-y-4">
          <nav className="text-white  text-sm font-normal space-x-6">
            <Link href={`/${locale}${PRIVACY_POLICY_PAGE_PATH}`}>
              {t("privacy_policy")}
            </Link>
            <span>|</span>
            <Link href={`/${locale}${TERMS_AND_CONDITIONS_PAGE_PATH}`}>
              {t("term_and_conditions")}
            </Link>
            <span>|</span>
            <Link href={`/${locale}${SITE_MAP_PAGE_PATH}`}>
              {t("site_map")}
            </Link>
          </nav>
          <span className="text-white text-sm font-normal">
            {t("copyright")}&nbsp;&copy;&nbsp;2024 carousel builder.&nbsp;
            {t("all_rights_reserved")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
