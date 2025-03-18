"use client";
import React, { FC, memo, useEffect, useState } from "react";
import Section from "./Section";
import { CheckCircle2, ShieldClose } from "lucide-react";
import { LinkButton } from "../ui";
import { HOME_PAGE_PATH } from "@/pathNames";
import { notFound, useSearchParams } from "next/navigation";
import Stripe from "stripe";
import { ADD_PURCHASE_PLAN_ROUTE, STRIPE_SECRET_KEY } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useActivePlanCookie, useUserCookie } from "@/hooks/use-cookie";

const PaymentSection: FC = () => {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const toast = useToast();
  const { user } = useUserCookie();
  const { setActivePlanCookie } = useActivePlanCookie();
  const [isPaymentSuccessful, setPaymentStatus] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyPayment = async (planId: number, paymentIntent: string) => {
      try {
        const stripe = new Stripe(STRIPE_SECRET_KEY);
        const verifyPaymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntent
        );
        if (verifyPaymentIntent.status === "succeeded") {
          setPaymentStatus(true);

          type ResponseData = {
            status: boolean;
            message: string;
            purchase: {
              plan_id: number;
              amount_paid: string;
              start_date: string;
              end_date: string;
              status: "active";
              plan: {
                duration: number;
                duration_unit: string;
              };
            };
          };

          const res = await axios
            .post<ResponseData>(
              ADD_PURCHASE_PLAN_ROUTE,
              {
                plan_id: planId,
              },
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${user.access_token}`,
                },
              }
            )
            .then((res) => res.data);

          if (res.status) {
            setActivePlanCookie({
              id: res.purchase.plan_id,
              amount_paid: res.purchase.amount_paid,
              start_date: res.purchase.start_date,
              end_date: res.purchase.end_date,
              duration: res.purchase.plan.duration,
              duration_unit: res.purchase.plan.duration_unit,
              status: res.purchase.status,
            });
          }
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
    const planId = searchParams.get("planId");
    if (!paymentIntent) {
      notFound();
    } else {
      verifyPayment(+planId!, paymentIntent);
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
