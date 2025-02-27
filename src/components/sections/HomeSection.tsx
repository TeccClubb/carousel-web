import React, { FC, memo } from "react";
import { Button } from "../ui";
import Image from "next/image";
import Section from "./Section";
import { homeSectionBlurImageSrc } from "@/assets/home-section-base64-image";

const HomeSection: FC<{ showGradient?: boolean }> = ({ showGradient }) => {
  return (
    <Section
      isHeroSection
      showGradient={showGradient}
      containerClassName="flex-col lg:flex-row gap-y-12"
    >
      <div className="lg:w-1/2 flex flex-col gap-y-6 px-4 text-center md:text-left">
        <h1 className="text-gray-900 dark:text-white break-words text-5xl font-bold leading-[60px]">
          Create beautiful Social media{" "}
          <span className="text-blue">Carousels</span> in seconds with AI
        </h1>
        <p className="text-gray-900 dark:text-white text-lg font-normal opacity-70">
          Carousel Maker lets you quickly create and design beautiful carousels
          for your social media posts using AI, without any design expertise
        </p>
        <Button className="bg-blue hover:bg-blue/80 self-center sm:self-start">
          Get Stated
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

export default memo(HomeSection);
