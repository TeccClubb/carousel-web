import React, { FC } from "react";
import { Button } from "../ui";
import Image from "next/image";
import Section from "./Section";
import { useTranslation } from "react-i18next";
import { homeSectionBlurImageSrc } from "@/assets/home-section-base64-image";

const HomeSection: FC<{ showGradient?: boolean }> = ({ showGradient }) => {
  const { t } = useTranslation();
  return (
    <Section
      isHeroSection
      showGradient={showGradient}
      className="flex-col lg:flex-row gap-y-12"
    >
      <div className="lg:w-1/2 flex flex-col gap-y-6 px-4 text-center md:text-left">
        <h1 className="text-gray-900 dark:text-white text-5xl font-bold leading-[60px]">
          {t("home_section_heading_part_1")}&nbsp;
          <span className="text-blue">{t("carousels")}</span>&nbsp;
          {t("home_section_heading_part_2")}&nbsp;AI
        </h1>
        <p className="text-gray-900 dark:text-white text-lg font-normal opacity-70">
          {t("home_section_description_part_1")}&nbsp;AI,&nbsp;
          {t("home_section_description_part_2")}
        </p>
        <Button className="bg-blue hover:bg-blue/80 self-center sm:self-start">
          {t("home_section_btn_text")}
        </Button>
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          className="rounded-xl w-full h-auto"
          src="/home-section-image.jpg"
          alt="Image not founded"
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

export default HomeSection;
