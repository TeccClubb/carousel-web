import React, { FC, memo, ReactNode } from "react";
import Section from "./Section";
import Image from "next/image";
import {
  FeatureIcon1,
  FeatureIcon2,
  FeatureIcon3,
  FeatureIcon4,
} from "@/icons";
import { featuresSectionBlurImageSrc } from "@/assets/features-section-base64-image";

const FeaturesSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
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
      containerClassName="flex-col gap-y-6"
    >
      <h1 className="text-gray-900 dark:text-white text-center text-6xl font-bold">
        Our Features
      </h1>
      <h2 className="text-blue text-center text-4xl font-medium">
        AI-Powered Carousel Generator
      </h2>
      <div className="flex flex-wrap flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/3 px-14 md:px-24 lg:px-0 lg:relative order-2 lg:order-1">
          <Feature
            className="lg:absolute left-0 top-24"
            title="From Concept to Showcase"
            description="Seamlessly transform any topic into a captivating carousel. Simply input your idea, and let our AI do the magic!"
          >
            <FeatureIcon1 />
          </Feature>

          <Feature
            className="lg:absolute left-0 lg:bottom-24 xl:bottom-32"
            title="URLs into Carousels"
            description="Effortlessly turn blog articles or URLs into visually stunning carousel slides. Ideal for sharing in-depth information with your audience."
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
            blurDataURL={featuresSectionBlurImageSrc}
            // style={{ width: "341px", height: "auto" }}
          />
        </div>

        <div className="w-full lg:w-1/3 px-14 md:px-24 lg:px-0 lg:relative order-3">
          <Feature
            className="lg:absolute lg:right-0 lg:top-36 xl:top-60"
            title="Text to Carousel Made Simple"
            description="Transform your text into eye-catching carousel slides in seconds. Perfect for creating impactful content quickly and efficiently."
          >
            <FeatureIcon3 />
          </Feature>

          <Feature
            className="lg:absolute lg:right-0 lg:bottom-0"
            title="Create Carousels in 100+ Languages"
            description="Generate carousels in over 100 languages to connect with a global audience. Amplify your content's reach with ease."
          >
            <FeatureIcon4 />
          </Feature>
        </div>
      </div>
    </Section>
  );
};

export default memo(FeaturesSection);
