"use client";
import React, { FC, memo, useEffect, useState } from "react";
import Section from "./Section";
import { CheckCircle2, ShieldClose } from "lucide-react";
import { LinkButton } from "../ui";
import { HOME_PAGE_PATH } from "@/pathNames";
import { notFound, useSearchParams } from "next/navigation";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { useTranslations } from "next-intl";

const PaymentSection: FC = () => {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const toast = useToast();
  const [isPaymentSuccessful, setPaymentStatus] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyPayment = async (paymentIntent: string) => {
      try {
        const stripe = new Stripe(STRIPE_SECRET_KEY);
        const verifyPaymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntent
        );
        if (verifyPaymentIntent.status === "succeeded") {
          setPaymentStatus(true);
        } else {
          setPaymentStatus(false);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    const paymentIntent = searchParams.get("payment_intent");
    if (!paymentIntent) {
      notFound();
    } else {
      verifyPayment(paymentIntent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section isHeroSection showGradient containerClassName="flex-col space-y-4">
      {isPaymentSuccessful && (
        <CheckCircle2 className="size-20 text-green-600" />
      )}
      {!isLoading && !isPaymentSuccessful && (
        <ShieldClose className="size-20 text-red-600" />
      )}
      {isLoading && (
        <>
          <div className="animate-spin shadow-xl shadow-slate-400 rounded-full h-32 w-32 border-t-2 border-b-2 border-black dark:border-slate-200"></div>
          <p className="text-xl font-semibold text-black dark:text-slate-200">
            {t("processing_payment")}
          </p>
        </>
      )}
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
        {!isLoading && !isPaymentSuccessful && t("payment_failed")}
        {isPaymentSuccessful && t("payment_successful")}
      </h1>
      {isPaymentSuccessful && (
        <>
          <p className="text-gray-500 dark:text-gray-400">
            {t("your_payment_has_been_completed")}
          </p>
          <LinkButton href={HOME_PAGE_PATH}>{t("back_to_home")}</LinkButton>
        </>
      )}
    </Section>
  );
};

export default memo(PaymentSection);
