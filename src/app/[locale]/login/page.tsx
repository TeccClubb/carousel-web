"use client";
import React, { FC } from "react";
import { AuthLayout, Login } from "@/components";

const LoginPage: FC = () => (
  <AuthLayout authentication={false}>
    <Login />
  </AuthLayout>
);

export default LoginPage;
