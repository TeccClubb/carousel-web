"use client";
import React, { FC } from "react";
import { ArticleSection } from "@/components/sections";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CAROUSEL_GENERATOR_PAGE_PATH } from "@/pathNames";
import {
  FACEBOOK_CAROUSEL_URL,
  INSTAGRAM_CAROUSEL_URL,
  LINKEDIN_CAROUSEL_URL,
  TWITTER_CAROUSEL_URL,
} from "@/links";

const AboutUsPage: FC = () => {
  const t = useTranslations();
  return (
    <ArticleSection heading={t("about_carousel_builder")}>
      <p>{t("about_us_paragraph1")}</p>
      <p>
        {t("about_us_paragraph2")}{" "}
        <Link
          href={INSTAGRAM_CAROUSEL_URL}
          target="_blank"
          className="text-blue-600"
        >
          Instagram
        </Link>
        {", "}
        <Link
          href={LINKEDIN_CAROUSEL_URL}
          target="_blank"
          className="text-blue-600"
        >
          LinkedIn
        </Link>
        {", "}
        <Link
          href={FACEBOOK_CAROUSEL_URL}
          target="_blank"
          className="text-blue-600"
        >
          Facebook
        </Link>
        {` ${t("and")} `}
        <Link
          href={TWITTER_CAROUSEL_URL}
          target="_blank"
          className="text-blue-600"
        >
          X (Twitter)
        </Link>
        .
      </p>
      <h3>{t("why_carousel_builder")}</h3>
      <ul>
        <li>{t("why_carousel_builder_point1")}</li>
        <li>{t("why_carousel_builder_point2")}</li>
        <li>{t("why_carousel_builder_point3")}</li>
        <li>{t("why_carousel_builder_point4")}</li>
        <li>{t("why_carousel_builder_point5")}</li>
      </ul>
      <h3>{t("our_mission")}</h3>
      <p>{t("our_mission_paragraph1")}</p>
      <p>{t("our_mission_paragraph2")}</p>
      <p>
        {t("ready_to_build_your_next_viral_carousel") + " "}
        <Link href={CAROUSEL_GENERATOR_PAGE_PATH} className="text-blue-600">
          <b>{t("try_it_now")}</b>
        </Link>
      </p>
    </ArticleSection>
  );
};

export default AboutUsPage;
