import React, { FC, ReactNode } from "react";
import Section from "./Section";
import { TemplateIcon1, TemplateIcon2, TemplateIcon3 } from "@/icons";
import { useTranslation } from "react-i18next";

const TemplatesSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const { t } = useTranslation();
  const TemplateCard: FC<{
    title: string;
    description: string;
    children: ReactNode;
  }> = ({ title, description, children }) => (
    <div className="bg-white dark:bg-gray-900 pr-20 flex w-full p-6 items-center gap-6 rounded-2xl shadow-xl transition duration-200">
      <div className="p-3 bg-[#0F73F6] rounded-xl flex items-center justify-center">
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
      className="flex-col-reverse lg:flex-row gap-y-4"
    >
      <div className="lg:w-1/2 px-4 flex flex-col xl:gap-y-8 gap-y-4 lg:pr-16 relative">
        <div className="absolute left-1/2 top-[6%] right-1/2 transform -translate-x-1/2 w-[25em] h-[25em] bg-[#0F73F6] opacity-10 blur-3xl rounded-full"></div>
        <TemplateCard
          title={t("template_card_1_title")}
          description={t("template_card_1_description")}
        >
          <TemplateIcon1 />
        </TemplateCard>

        <TemplateCard
          title={t("template_card_2_title")}
          description={t("template_card_2_description")}
        >
          <TemplateIcon2 />
        </TemplateCard>

        <TemplateCard
          title={t("template_card_3_title")}
          description={t("template_card_3_description")}
        >
          <TemplateIcon3 />
        </TemplateCard>
      </div>
      <div className="lg:w-1/2 px-4 text-center lg:text-left">
        <span className="text-[#0F73F6] text-base font-medium">
          {t("template_section_description")}
        </span>
        <h1 className="text-gray-900 dark:text-white lg:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
          {t("template_section_heading")}
        </h1>
      </div>
    </Section>
  );
};

export default TemplatesSection;
