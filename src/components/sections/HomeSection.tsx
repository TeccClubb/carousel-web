import React, { FC, memo } from "react";
import { LinkButton } from "../ui/button";
import Image from "next/image";
import Section from "./Section";
import { homeSectionBlurImageSrc } from "@/assets/home-section-base64-image";
import { useTranslations } from "next-intl";
import { CAROUSEL_GENERATOR_PAGE_PATH } from "@/pathNames";

const HomeSection: FC<{ showGradient?: boolean }> = ({ showGradient }) => {
  const t = useTranslations();
  return (
    <Section
      isHeroSection
      showGradient={showGradient}
      containerClassName="flex-col lg:flex-row gap-y-12"
    >
      <div className="lg:w-1/2 flex flex-col gap-y-6 px-4 text-center md:text-left">
        <h1 className="text-gray-900 dark:text-white break-words text-5xl font-bold leading-[60px]">
          {t("home_section_heading_p1")}{" "}
          <span className="text-blue">{t("carousels")}</span>{" "}
          {t("home_section_heading_p2")}
        </h1>
        <p className="text-gray-900 dark:text-white text-lg font-normal opacity-70">
          {t("home_section_description")}
        </p>
        <LinkButton
          href={CAROUSEL_GENERATOR_PAGE_PATH}
          className="bg-blue hover:bg-blue/80 self-center sm:self-start"
        >
          {t("start_for_free")}
        </LinkButton>
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          className="rounded-xl w-full h-auto"
          src="/home-section-image.png"
          alt={t("image_not_founded")}
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={homeSectionBlurImageSrc}
        />
      </div>
    </Section>
  );
};

export default memo(HomeSection);
