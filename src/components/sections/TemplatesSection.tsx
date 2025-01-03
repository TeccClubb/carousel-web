import React, { FC, ReactNode } from "react";
import Section from "./Section";
import { TemplateIcon1, TemplateIcon2, TemplateIcon3 } from "@/icons";

const TemplatesSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
}> = ({ isHeroSection, showGradient }) => {
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
      className="flex-col-reverse lg:flex-row gap-y-4"
    >
      <div className="lg:w-1/2 px-4 flex flex-col xl:gap-y-8 gap-y-4 lg:pr-16">
        <TemplateCard
          title="Background Patterns & Designs"
          description="Enhance your slides with a selection of stunning background patterns and designs, adding depth."
        >
          <TemplateIcon1 />
        </TemplateCard>

        <TemplateCard
          title="Customizable Templates"
          description="Kickstart your design with professionally crafted templates and make them your own. No need to design from the ground."
        >
          <TemplateIcon2 />
        </TemplateCard>

        <TemplateCard
          title="Upload Custom Backgrounds"
          description="Personalize your carousels even further by uploading your own backgrounds. Achieve unique, branded visuals effortlessly."
        >
          <TemplateIcon3 />
        </TemplateCard>
      </div>
      <div className="lg:w-1/2 px-4 text-center lg:text-left">
        <span className="text-[#0F73F6] text-base font-medium">
          Personalize your carousels with ease
        </span>
        <h1 className="text-gray-900 dark:text-white lg:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
          Flexible Templates and Designs
        </h1>
      </div>
    </Section>
  );
};

export default TemplatesSection;
