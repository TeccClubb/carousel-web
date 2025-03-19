import React, { FC, memo, ReactNode } from "react";
import Section from "./Section";
import { BrandIcon1, BrandIcon2, BrandIcon3 } from "@/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { brandSectionBlurImageSrc } from "@/assets/brand-section-base64-image";

const BrandSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const t = useTranslations();
  const BrandCard: FC<{
    title: string;
    description: string;
    children: ReactNode;
  }> = ({ title, description, children }) => (
    <div className="bg-white dark:bg-gray-900 sm:pr-20 flex sm:flex-row flex-col w-full p-6 sm:items-start items-center gap-6 rounded-2xl shadow-xl transition duration-200">
      <div className="p-3 bg-[#0F73F6] rounded-xl flex items-center justify-center">
        {children}
      </div>
      <div className="sm:text-start text-center space-y-2">
        <span className="text-gray-900 dark:text-white text-lg font-semibold">
          {title}
        </span>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium opacity-80">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
      containerClassName="flex-col lg:flex-row gap-y-4"
    >
      <div className="lg:w-1/2 px-4 text-center lg:text-left">
        <span className="text-[#0F73F6] text-base font-medium">
          {t("brand_section_description")}
        </span>
        <h1 className="text-gray-900 dark:text-white lg:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
          {t("brand_section_heading")}
        </h1>
        <Image
          className="w-full h-auto mt-8 rounded-md"
          src="/brand-section-image.png"
          alt={t("image_not_founded")}
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={brandSectionBlurImageSrc}
        />
      </div>

      <div className="lg:w-1/2 px-4 flex flex-col xl:gap-y-8 gap-y-4 relative">
        <div className="absolute left-1/2 top-[6%] right-1/2 transform -translate-x-1/2 w-[30em] h-[35em] bg-[#0F73F6] opacity-10 blur-3xl rounded-full"></div>
        <BrandCard
          title={t("brand_section_card1_title")}
          description={t("brand_section_card1_description")}
        >
          <BrandIcon1 />
        </BrandCard>

        <BrandCard
          title={t("brand_section_card2_title")}
          description={t("brand_section_card2_description")}
        >
          <BrandIcon2 />
        </BrandCard>

        <BrandCard
          title={t("brand_section_card3_title")}
          description={t("brand_section_card3_description")}
        >
          <BrandIcon3 />
        </BrandCard>
      </div>
    </Section>
  );
};

export default memo(BrandSection);
