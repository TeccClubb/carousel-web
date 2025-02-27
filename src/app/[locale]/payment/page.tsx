"use client";
import React, { FC, Suspense } from "react";
import { PaymentSuccessSection } from "@/components/sections";

const PaymentPage: FC = () => (
  <Suspense>
    <PaymentSuccessSection />
  </Suspense>
);

export default PaymentPage;
