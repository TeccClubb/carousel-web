"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-sonner-toast";
import axios, { AxiosError } from "axios";
import { TERMS_AND_CONDITIONS_AND_PRIVACY_POLICY_ROUTE } from "@/constant";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useAppState } from "@/hooks/use-app-state";
import { useTranslate } from "@/hooks/use-translate";
import {
  setPrivacyPolicy,
  setTermsOfConditionsAndPrivacyPolicy,
} from "@/store/app.slice";
import { ArticleSection } from "@/components/sections";

const PrivacyPolicy: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const toast = useToast();
  const { privacyPolicy, isTocAndPrivacyPolicyLoadedOnce } = useAppState();
  const [isLoading, setLoading] = useState<boolean>(true);

  const { isTranslating, errorMessage } = useTranslate({
    data: JSON.stringify(privacyPolicy),
    requiredResponse: "html",
    onTranslate: (translatedData) => dispatch(setPrivacyPolicy(translatedData)),
    extraDependencies: [isTocAndPrivacyPolicyLoadedOnce],
  });

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        if (isTocAndPrivacyPolicyLoadedOnce) return;
        const res = await axios.get<{
          privacy_policy: string;
          tos: string;
        }>(TERMS_AND_CONDITIONS_AND_PRIVACY_POLICY_ROUTE, {
          headers: {
            Accept: "application/json",
          },
        });
        if (res.status) {
          dispatch(
            setTermsOfConditionsAndPrivacyPolicy({
              termsAndConditions: res.data.tos,
              privacyPolicy: res.data.privacy_policy,
            })
          );
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
    fetchPrivacyPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ArticleSection
      heading={t("privacy_policy")}
      htmlContent={privacyPolicy}
      errorMessage={errorMessage}
      isLoading={isLoading}
      isTranslating={isTranslating}
    />
  );
};

export default memo(PrivacyPolicy);
