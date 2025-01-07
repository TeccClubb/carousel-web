import React, { FC } from "react";
import { FAQSection, PriceSection } from "@/components/sections";

const PricingPage: FC = () => {
  return (
    <>
      <PriceSection isHeroSection showGradient />
      <FAQSection showGradient cornerGradient="left" />
    </>
  );
};

export default PricingPage;
