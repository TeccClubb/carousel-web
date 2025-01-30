import React, { FC, ReactNode } from "react";
import Section from "./Section";
import Image from "next/image";
import {
  FeatureIcon1,
  FeatureIcon2,
  FeatureIcon3,
  FeatureIcon4,
} from "@/icons";
import { useTranslation } from "react-i18next";

const FeaturesSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const { t } = useTranslation();
  const Feature: FC<{
    title: string;
    description: string;
    children: ReactNode;
    className?: string;
  }> = ({ title, description, children, className }) => (
    <div className={`flex gap-x-4 my-8 lg:my-0 ${className}`}>
      <div className="bg-[#E2E8F0] w-16 h-16 px-3 rounded-full flex items-center justify-center">
        {children}
      </div>
      <div className="flex flex-col gap-y-4">
        <span className="text-gray-900 dark:text-white text-lg font-semibold">
          {title}
        </span>
        <p className=" text-gray-600 dark:text-gray-400 text-lg leading-1">
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
      className="flex-col gap-y-6"
    >
      <h1 className="text-gray-900 dark:text-white text-center text-6xl font-bold">
        {t("features_section_heading")}
      </h1>
      <h2 className="text-blue text-center text-4xl font-medium">
        AI-{t("features_section_description")}
      </h2>
      <div className="flex flex-wrap flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/3 px-14 md:px-24 lg:px-0 lg:relative order-2 lg:order-1">
          <Feature
            className="lg:absolute left-0 top-24"
            title={t("feature_1_title")}
            description={`${t("feature_1_description_part_1")} AI ${t(
              "feature_1_description_part_2"
            )}`}
          >
            <FeatureIcon1 />
          </Feature>

          <Feature
            className="lg:absolute left-0 lg:bottom-24 xl:bottom-32"
            title={t("feature_2_title")}
            description={t("feature_2_description")}
          >
            <FeatureIcon2 />
          </Feature>
        </div>

        <div className="w-full lg:w-1/3 px-4 order-1 lg:order-2">
          <Image
            className="rounded-xl mx-auto w-80 h-auto"
            src="/feature-image.png"
            alt="image not founded"
            width={0}
            height={0}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="/feature-image.png"
            // style={{ width: "341px", height: "auto" }}
          />
        </div>

        <div className="w-full lg:w-1/3 px-14 md:px-24 lg:px-0 lg:relative order-3">
          <Feature
            className="lg:absolute lg:right-0 lg:top-36 xl:top-60"
            title={t("feature_3_title")}
            description={t("feature_3_description")}
          >
            <FeatureIcon3 />
          </Feature>

          <Feature
            className="lg:absolute lg:right-0 lg:bottom-0"
            title={t("feature_4_title")}
            description={t("feature_4_description")}
          >
            <FeatureIcon4 />
          </Feature>
        </div>
      </div>
    </Section>
  );
};

export default FeaturesSection;
