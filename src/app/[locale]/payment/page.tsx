"use client";
import React, { FC, Suspense } from "react";
import { PaymentSection } from "@/components/sections";

const PaymentPage: FC = () => (
  <Suspense>
    <PaymentSection />
  </Suspense>
);

export default PaymentPage;
