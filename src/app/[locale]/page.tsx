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

const HomePage: FC = () => (
  <>
    <HomeSection showGradient />
    <FeaturesSection />
    <TemplatesSection cornerGradient="right" />
    <BrandSection cornerGradient="left" />
    <DesignToolsSection />
    <PriceSection showGradient />
    <BlogSection />
    <FAQSection showGradient />
  </>
);

export default HomePage;
