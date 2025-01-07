import React, { FC } from "react";
import PriceCard from "./PriceCard";
import Section from "./Section";

const PriceSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
    >
      <div className="flex flex-col gap-y-8 w-full">
        <div className="text-center">
          <span className="text-[#0F73F6] text-base font-medium">
            PRICING PLAN
          </span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            Choose Your Plan
          </h1>
        </div>

        <div className="flex flex-wrap w-full">
          <PriceCard
            heading="Standard Membership"
            price={14.99}
            features={[
              "Enhanced Resource Access",
              "Monthly Credits",
              "Priority Customer Support",
              "Community Features Access",
            ]}
          />
          <PriceCard
            heading="Plus Membership"
            price={29.99}
            features={[
              "All Standard Benefits",
              "Increased Monthly Credits",
              "Early Access to New Releases",
              "Member-Only Offers",
            ]}
            isBestPrice
          />
          <PriceCard
            heading="Pro Membership"
            price={49.99}
            features={[
              "All Plus Benefits",
              "Unlimited Downloads",
              "Custom Licensing",
              "Direct Creator Collaboration",
            ]}
          />
        </div>
      </div>
    </Section>
  );
};

export default PriceSection;
