"use client";
import React, { FC, memo } from "react";
import { Link } from "@/i18n/navigation";
import {
  CarouselBuilderLogo,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XTwitterIcon,
  YoutubeIcon,
} from "@/icons";
import {
  FACEBOOK_CAROUSEL_URL,
  INSTAGRAM_CAROUSEL_URL,
  LINKEDIN_CAROUSEL_URL,
  TIKTOK_CAROUSEL_URL,
  TWITTER_CAROUSEL_URL,
  YOUTUBE_CAROUSEL_URL,
} from "@/links";
import {
  ABOUT_US_PAGE_PATH,
  AFFILIATE_DASHBOARD_PAGE_PATH,
  AFFILIATE_PROGRAM_PAGE_PATH,
  AFFILIATE_SIGNUP_PAGE_PATH,
  BLOGS_PAGE_PATH,
  CAROUSEL_GENERATOR_PAGE_PATH,
  HOME_PAGE_PATH,
  PRIVACY_POLICY_PAGE_PATH,
  REFUND_POLICY_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "@/pathNames";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setSlideRatio } from "@/store/carousels.slice";

const FooterSlice: FC<{
  title: string;
  links: { text: string; href: string; onClick?: () => void }[];
}> = ({ title, links = [] }) => (
  <div className="w-full md:w-1/3 sm:w-1/2">
    <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-8">
      {title}
    </h3>
    <ul role="list" className="mt-6 list-none">
      {links.map((link, index) => (
        <li key={link.href + index} className="mb-4">
          <Link
            href={link.href}
            onClick={link.onClick}
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
  const dispatch = useDispatch();
  const t = useTranslations();
  const socialIconSize = "1.5em";

  const socialIcons = [
    {
      href: FACEBOOK_CAROUSEL_URL,
      icon: <FacebookIcon size={socialIconSize} />,
    },
    {
      href: TWITTER_CAROUSEL_URL,
      icon: <XTwitterIcon size={socialIconSize} />,
    },
    {
      href: INSTAGRAM_CAROUSEL_URL,
      icon: <InstagramIcon size={socialIconSize} />,
    },
    {
      href: LINKEDIN_CAROUSEL_URL,
      icon: <LinkedInIcon size={socialIconSize} />,
    },
    {
      href: YOUTUBE_CAROUSEL_URL,
      icon: <YoutubeIcon size={socialIconSize} />,
    },
    {
      href: TIKTOK_CAROUSEL_URL,
      icon: <TikTokIcon size={socialIconSize} />,
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
                  text: "Linkedin Carousel",
                  href: CAROUSEL_GENERATOR_PAGE_PATH,
                  onClick: () =>
                    dispatch(
                      setSlideRatio({
                        ratioId: "linkedIn1",
                        width: 4,
                        height: 5,
                      })
                    ),
                },
                {
                  text: "TikTok Carousel",
                  href: CAROUSEL_GENERATOR_PAGE_PATH,
                  onClick: () =>
                    dispatch(
                      setSlideRatio({
                        ratioId: "tikTok",
                        width: 9,
                        height: 16,
                      })
                    ),
                },
                {
                  text: "Instagram Carousel",
                  href: CAROUSEL_GENERATOR_PAGE_PATH,
                  onClick: () =>
                    dispatch(
                      setSlideRatio({
                        ratioId: "instaFeed1",
                        width: 4,
                        height: 5,
                      })
                    ),
                },
                {
                  text: "Facebook Carousel",
                  href: CAROUSEL_GENERATOR_PAGE_PATH,
                  onClick: () =>
                    dispatch(
                      setSlideRatio({
                        ratioId: "facebookFeed1",
                        width: 4,
                        height: 5,
                      })
                    ),
                },
                {
                  text: "Pinterest Carousel",
                  href: CAROUSEL_GENERATOR_PAGE_PATH,
                  onClick: () =>
                    dispatch(
                      setSlideRatio({
                        ratioId: "pinterest1",
                        width: 2,
                        height: 3,
                      })
                    ),
                },
              ]}
            />
            <FooterSlice
              title={t("affiliates")}
              links={[
                {
                  text: t("affiliate_program"),
                  href: AFFILIATE_PROGRAM_PAGE_PATH,
                },
                {
                  text: t("become_an_affiliates"),
                  href: AFFILIATE_SIGNUP_PAGE_PATH,
                },
                {
                  text: t("affiliate_dashboard"),
                  href: AFFILIATE_DASHBOARD_PAGE_PATH,
                },
              ]}
            />
            <FooterSlice
              title={t("resources")}
              links={[
                {
                  text: t("blog"),
                  href: BLOGS_PAGE_PATH,
                },
                {
                  text: t("refund_policy"),
                  href: REFUND_POLICY_PAGE_PATH,
                },
                {
                  text: t("about_us"),
                  href: ABOUT_US_PAGE_PATH,
                },
                {
                  text: t("contact"),
                  href: HOME_PAGE_PATH + "#faq-contact-form",
                },
              ]}
            />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-y-4 items-center justify-center lg:items-start lg:justify-start px-4 order-1 lg:order-2">
            <CarouselBuilderLogo className="w-36" />

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
            <Link href={PRIVACY_POLICY_PAGE_PATH}>{t("privacy_policy")}</Link>
            <span>|</span>
            <Link href={TERMS_AND_CONDITIONS_PAGE_PATH}>
              {t("terms_and_condition")}
            </Link>
          </nav>
          <span className="text-white text-sm font-normal">
            {t("footer_copy_right_message")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
