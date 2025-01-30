import React, { FC, ReactNode } from "react";
import Section from "./Section";
import { ToolIcon1, ToolIcon2, ToolIcon3, ToolIcon4 } from "@/icons";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { designToolsSectionBlurImageSrc } from "@/assets/design-tools-section-base64-image";

const DesignToolsSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const { t } = useTranslation();
  const imageSrc = "/design-tools-section-image.png";
  const ToolCard: FC<{
    title: string;
    description: string;
    isIconLarge?: boolean;
    children: ReactNode;
  }> = ({ title, description, isIconLarge, children }) => (
    <div className="bg-white dark:bg-gray-900 pr-16 flex w-full p-6 items-center gap-6 rounded-2xl shadow-xl transition duration-200">
      <div
        className={`${
          isIconLarge ? "" : "p-4"
        } bg-[#E2E8F0] rounded-full flex items-center justify-center`}
      >
        {children}
      </div>
      <div>
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
      className="flex-col lg:flex-row gap-y-4"
    >
      <div className="lg:w-1/2 px-4 pr-16 flex flex-col gap-y-4">
        <div className="text-center lg:text-left">
          <span className="text-[#0F73F6] text-base font-medium">
            {t("design_tool_section_description")}
          </span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            {t("design_tool_section_heading")}
          </h1>
        </div>

        <Image
          className="w-full h-auto md:px-32 sm:px-24 self-center lg:hidden"
          src={imageSrc}
          alt="Image not founded"
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={designToolsSectionBlurImageSrc}
        />

        <ToolCard
          isIconLarge
          title={t("design_tool_section_card_1_title")}
          description={t("design_tool_section_card_1_description")}
        >
          <ToolIcon1 />
        </ToolCard>

        <ToolCard
          title={t("design_tool_section_card_2_title")}
          description={t("design_tool_section_card_2_description")}
        >
          <ToolIcon2 />
        </ToolCard>

        <ToolCard
          title={t("design_tool_section_card_3_title")}
          description={t("design_tool_section_card_3_description")}
        >
          <ToolIcon3 />
        </ToolCard>

        <ToolCard
          title={t("design_tool_section_card_4_title")}
          description={t("design_tool_section_card_4_description")}
        >
          <ToolIcon4 />
        </ToolCard>
      </div>
      <div className="lg:w-1/2 px-4 hidden lg:block">
        <Image
          className="w-full h-auto"
          src={imageSrc}
          alt="Image not founded"
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={designToolsSectionBlurImageSrc}
        />
      </div>
    </Section>
  );
};

export default DesignToolsSection;
