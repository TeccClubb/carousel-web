"use client";
import React, { FC } from "react";

import {
  BlogSection,
  BrandSection,
  DesignToolsSection,
  FAQSection,
  FeaturesSection,
  HomeSection,
  PriceSection,
  TemplatesSection,
} from "@/components/sections";

const HomePage: FC = () => {
  return (
    <>
      <HomeSection />
      <FeaturesSection />
      <TemplatesSection />
      <BrandSection />
      <DesignToolsSection />
      <PriceSection />
      <BlogSection />
      <FAQSection />
    </>
  );
};

export default HomePage;
