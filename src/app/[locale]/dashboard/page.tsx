"use client";

import React, { FC } from "react";
import { AuthLayout, Dashboard } from "@/components";

const DashboardPage: FC = () => (
  <AuthLayout authentication>
    <Dashboard />
  </AuthLayout>
);

export default DashboardPage;
