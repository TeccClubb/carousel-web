"use client";
import React, { FC } from "react";

import {
  BlogSliderSection,
  BrandSection,
  DesignToolsSection,
  FAQSection,
  FeaturesSection,
  HomeSection,
  PriceSection,
  TemplatesSection,
} from "@/components/sections";

const HomePage: FC = () => (
  <>
    <HomeSection showGradient />
    <FeaturesSection />
    <TemplatesSection cornerGradient="right" />
    <BrandSection cornerGradient="left" />
    <DesignToolsSection />
    <PriceSection showGradient />
    <BlogSliderSection />
    <FAQSection showGradient />
  </>
);

export default HomePage;
