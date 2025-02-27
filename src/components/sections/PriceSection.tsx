"use client";
import React, { FC, memo, useState } from "react";
import PriceCard from "./PriceCard";
import Section from "./Section";
import { loadStripe, StripeElementsOptionsMode } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/constant";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import { usePlans } from "@/hooks/use-plans.state";
import { SkeletonCard } from "../elements";

const PriceSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const { isPlansLoading, plans } = usePlans();
  const [plan, setPlan] = useState<{ heading: string; price: number }>();

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const options: StripeElementsOptionsMode = {
    mode: "payment",
    amount: (plan?.price ?? 0) * 100,
    currency: "usd",
    appearance: {
      variables: {
        colorPrimary: "#1c2a5a",
        colorBackground: "#ffffff",
        colorText: "#1c2a5a",
        // colorSuccess: "#00FF00",
        colorDanger: `#f44336`,
        // colorWarning: "#FFFF00",
      },
    },
  };

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
      className={plan ? "items-start" : ""}
    >
      <div className="flex flex-col gap-y-8 w-full">
        <div className="text-center">
          <span className="text-[#0F73F6] text-base font-medium">
            {!plan ? "PRICING PLAN" : "Get pro Plan"}
          </span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            {!plan ? "Choose Your Plan" : `${plan.heading} $${plan.price}`}
          </h1>
        </div>

        {!plan && (
          <div className="flex flex-wrap w-full">
            {isPlansLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} className="m-2" />
              ))}

            {plans.map((plan) => (
              <PriceCard
                key={plan.id}
                heading={plan.name}
                price={plan.price}
                features={plan.description.split(",")}
                onGetPlan={(heading, price) => setPlan({ heading, price })}
              />
            ))}
          </div>
        )}

        {plan && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm amount={plan.price * 100} />
          </Elements>
        )}
      </div>
    </Section>
  );
};

export default memo(PriceSection);
