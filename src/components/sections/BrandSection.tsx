import React, { FC, ReactNode } from "react";
import Section from "./Section";
import { BrandIcon1, BrandIcon2, BrandIcon3 } from "@/icons";

const BrandSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const BrandCard: FC<{
    title: string;
    description: string;
    children: ReactNode;
  }> = ({ title, description, children }) => (
    <div className="bg-white dark:bg-gray-900 pr-20 flex w-full p-6 items-start gap-6 rounded-2xl shadow-xl transition duration-200">
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
      className="flex-col lg:flex-row gap-y-4"
    >
      <div className="lg:w-1/2 px-4 text-center lg:text-left">
        <span className="text-[#0F73F6] text-base font-medium">
          Seamlessly integrate your brand identity
        </span>
        <h1 className="text-gray-900 dark:text-white lg:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
          Seamless Branding Integration
        </h1>
      </div>

      <div className="lg:w-1/2 px-4 flex flex-col xl:gap-y-8 gap-y-4 relative">
        <div className="absolute left-1/2 top-[6%] right-1/2 transform -translate-x-1/2 w-[30em] h-[35em] bg-[#0F73F6] opacity-10 blur-3xl rounded-full"></div>
        <BrandCard
          title="Font Pairing,Size and Alignment"
          description="Select font pairs that align with your brand's personality or customize them to fit your preferences. Fine-tune font size and alignment to achieve a polished, professional look while enhancing readability."
        >
          <BrandIcon1 />
        </BrandCard>

        <BrandCard
          title="Color Palettes"
          description="Effortlessly incorporate your logo and brand colors for cohesive, recognizable carousels. Choose from curated color palettes or design your own to perfectly complement your brand's identity."
        >
          <BrandIcon2 />
        </BrandCard>

        <BrandCard
          title="Profiles for Companies and Individuals"
          description="Personalize carousels for corporate and individual profiles. Easily integrate your logo, include your website URL or social handle, and deliver impactful branding. Designed to adapt seamlessly to diverse content formats"
        >
          <BrandIcon3 />
        </BrandCard>
      </div>
    </Section>
  );
};

export default BrandSection;
