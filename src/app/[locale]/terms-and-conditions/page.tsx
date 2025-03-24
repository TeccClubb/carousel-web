"use client";
import React, { FC, useEffect, useState } from "react";
import Section from "@/components/sections/Section";
import axios, { AxiosError } from "axios";
import { TERMS_AND_CONDITIONS_AND_PRIVACY_POLICY_ROUTE } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { Loader2 } from "lucide-react";
const TermsAndConditions: FC = () => {
  const toast = useToast();
  const [termsAndConditions, setTermsAndConditions] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const res = await axios.get<{
          privacy_policy: string;
          tos: string;
        }>(TERMS_AND_CONDITIONS_AND_PRIVACY_POLICY_ROUTE, {
          headers: {
            Accept: "application/json",
          },
        });
        if (res.status) {
          setTermsAndConditions(res.data.tos);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response
              ? error.response.data.message
              : error.message
            : "Something went wrong";

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchTermsAndConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section showGradient isHeroSection containerClassName="flex-col gap-4">
      <h2 className="text-[40px] font-semibold">Terms of Service</h2>
      {isLoading && <Loader2 className="animate-spin size-12" />}
      <article
        className="text-[20px] font-medium"
        dangerouslySetInnerHTML={{ __html: termsAndConditions }}
      ></article>
    </Section>
  );
};

export default TermsAndConditions;
