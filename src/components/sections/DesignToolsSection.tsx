import React, { FC, ReactNode } from "react";
import Section from "./Section";
import { ToolIcon1, ToolIcon2, ToolIcon3, ToolIcon4 } from "@/icons";
import Image from "next/image";

const DesignToolsSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
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
            Streamline Your Carousel Creation
          </span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            Accessible Design Tools
          </h1>
        </div>

        <Image
          className="w-full h-auto md:px-32 sm:px-24 self-center lg:hidden"
          src={imageSrc}
          alt="Image not founded"
          width={0}
          height={0}
          sizes="100vw"
          priority
        />

        <ToolCard
          isIconLarge
          title="Easily Rearrange Slides"
          description="Drag and drop slides to effortlessly change their order. Organize your content with ease."
        >
          <ToolIcon1 />
        </ToolCard>

        <ToolCard
          title="Personalize Navigation Arrows"
          description="Select from a variety of arrow styles or text options for seamless navigation. Customize the look and feel of your carousel."
        >
          <ToolIcon2 />
        </ToolCard>

        <ToolCard
          title="Automatic Save Function"
          description="Your progress is saved automatically as you work, so you never have to worry about losing your changes."
        >
          <ToolIcon3 />
        </ToolCard>

        <ToolCard
          title="Shuffle Design Elements"
          description="Click the Randomize button to instantly apply a unique mix of fonts, colors, backgrounds, and designs. Ideal for sparking creativity and exploring fresh ideas."
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
          priority
        />
      </div>
    </Section>
  );
};

export default DesignToolsSection;
