import React, { FC } from "react";
import { AuthLayout, Signup } from "@/components";

const SignupPage: FC = () => (
  <AuthLayout authentication={false}>
    <Signup />
  </AuthLayout>
);

export default SignupPage;
