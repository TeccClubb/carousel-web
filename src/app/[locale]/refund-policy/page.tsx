"use client";
import React, { FC } from "react";
import { ArticleSection } from "@/components/sections";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HOME_PAGE_PATH } from "@/pathNames";
import { htmlContent } from "@/lib/utils";

const RefundPolicyPage: FC = () => {
  const t = useTranslations();
  return (
    <ArticleSection heading={t("refund_policy")}>
      <p>
        {t("refund_policy_description")}{" "}
        <Link href={HOME_PAGE_PATH} className="text-blue-600">
          (https://carouselbuilder.io)
        </Link>
      </p>

      <h3>{t("satisfaction_guarantee")}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: htmlContent(t("satisfaction_guarantee_paragraph1")),
        }}
      ></p>
      <p>{t("satisfaction_guarantee_paragraph2")}</p>

      <h3>{t("refunds_for_subscription_plans")}</h3>
      <ul>
        <li
          dangerouslySetInnerHTML={{
            __html: htmlContent(t("refunds_for_subscription_plans_point1")),
          }}
        ></li>
        <li
          dangerouslySetInnerHTML={{
            __html: htmlContent(t("refunds_for_subscription_plans_point2")),
          }}
        ></li>
        <li>
          {t("refunds_for_subscription_plans_point3_part1")}{" "}
          <Link href="mailto:pay@carouselbuilder.io" className="text-blue-600">
            pay@carouselbuilder.io
          </Link>{" "}
          {t("refunds_for_subscription_plans_point3_part2")}
        </li>
      </ul>

      <h3>{t("exceptions")}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: htmlContent(t("exceptions_description")),
        }}
      ></p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("exceptions_point1") }}></li>
        <li dangerouslySetInnerHTML={{ __html: t("exceptions_point2") }}></li>
        <li dangerouslySetInnerHTML={{ __html: t("exceptions_point3") }}></li>
      </ul>

      <h3>{t("processing_time")}</h3>
      <p>{t("processing_time_description")}</p>
      <ul>
        <li
          dangerouslySetInnerHTML={{
            __html: htmlContent(t("processing_time_point1")),
          }}
        ></li>
        <li>{t("processing_time_point2")}</li>
        <li>{t("processing_time_point3")}</li>
      </ul>

      <h3>{t("subscription_cancellation")}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: htmlContent(t("subscription_cancellation_paragraph")),
        }}
      ></p>

      <h3>{t("questions")}</h3>
      <p>
        {t("questions_description")}{" "}
        <Link href="mailto:pay@carouselbuilder.io" className="text-blue-600">
          pay@carouselbuilder.io
        </Link>
      </p>
    </ArticleSection>
  );
};

export default RefundPolicyPage;
