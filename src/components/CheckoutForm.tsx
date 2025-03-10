"use client";

import React, { FC, FormEvent, memo, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Stripe from "stripe";
import { Button } from "./ui";
import { useToast } from "@/hooks/use-sonner-toast";
import { STRIPE_SECRET_KEY } from "@/constant";
import { PAYMENT_SUCCESSFUL_PAGE_PATH } from "@/pathNames";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";

const CheckoutForm: FC<{ planId: number; amount: number }> = ({
  planId,
  amount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const locale = useLocale();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (errorMessage) {
      toast.error(`Payment failed, ${errorMessage}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    try {
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Show error to your customer
        setErrorMessage(submitError.message);
        return;
      }

      setLoading(true);
      setErrorMessage(undefined);
      const stripeSecret = new Stripe(STRIPE_SECRET_KEY);
      const paymentIntent = await stripeSecret.paymentIntents.create({
        amount,
        currency: "usd",
      });

      const clientSecret = paymentIntent.client_secret;
      if (!clientSecret) {
        setErrorMessage("Client secret is missing");
        return;
      }

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/${locale}${PAYMENT_SUCCESSFUL_PAGE_PATH}?planId=${planId}`,
        },
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {errorMessage && (
        <div className="mt-4 text-destructive">{errorMessage}</div>
      )}
      <Button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full mt-4"
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {isLoading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
};

export default memo(CheckoutForm);
