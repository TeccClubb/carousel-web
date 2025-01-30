import React, { FC } from "react";
import PriceCard from "./PriceCard";
import Section from "./Section";
import { useTranslation } from "react-i18next";

const PriceSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const { t } = useTranslation();
  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
    >
      <div className="flex flex-col gap-y-8 w-full">
        <div className="text-center">
          <span className="text-[#0F73F6] text-base font-medium">
            {t("price_section_title")}
          </span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            {t("price_section_heading")}
          </h1>
        </div>

        <div className="flex flex-wrap w-full">
          <PriceCard
            heading={t("price_section_card_1_heading")}
            price={14.99}
            features={t("price_section_card_1_features").replace(/, /g, ",").split(",")}
          />
          <PriceCard
            heading={t("price_section_card_2_heading")}
            price={29.99}
            features={t("price_section_card_2_features").replace(/, /g, ",").split(",")}
            isBestPrice
          />
          <PriceCard
            heading={t("price_section_card_3_heading")}
            price={49.99}
            features={t("price_section_card_3_features").replace(/, /g, ",").split(",")}
          />
        </div>
      </div>
    </Section>
  );
};

export default PriceSection;
