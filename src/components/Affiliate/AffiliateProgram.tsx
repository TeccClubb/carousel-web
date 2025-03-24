import React, { FC, memo } from "react";
import Section from "../sections/Section";
import { useTranslations } from "next-intl";
import { LinkButton } from "../ui/button";
import { AFFILIATE_SIGNUP_PAGE_PATH } from "@/pathNames";

const AffiliateProgram: FC = () => {
  const t = useTranslations();
  return (
    <>
      <Section
        showGradient
        containerClassName="flex flex-col items-start gap-4"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{t("affiliate_program")}</h3>
          <span className="text-[10px] font-medium text-[#0139FF] bg-[#0139FF4D] rounded-full px-1.5 hover:bg-indigo-200 cursor-default">
            {t("earn_40_percent_commission_on_all_payments")}
          </span>
        </div>
        <h1 className="text-5xl font-medium">{t("boost_your_earnings")}</h1>
        <p className="text-lg font-normal md:w-1/2">
          {t(
            "by_joining_our_program_you_have_the_opportunity_to_earn_a_40_percent"
          )}
        </p>
        <LinkButton href={AFFILIATE_SIGNUP_PAGE_PATH} variant="blue">
          {t("join_the_affiliate_program")}
        </LinkButton>
        <p className="text-xs font-normal">
          {t(
            "by_pressing_join_the_affiliate_program_you_agree_to_our_program_terms"
          )}
        </p>
      </Section>
      <Section
        className="bg-blue text-white"
        containerClassName="flex flex-col items-start gap-4"
      >
        <span className="text-[10px] font-medium text-[#0139FF] bg-white rounded-full px-1.5 hover:bg-indigo-200 cursor-default uppercase">
          {t("your_next_side_hustle")}
        </span>
        <h1 className="text-5xl font-medium">
          {t("get_1000_extra_each_month")}
        </h1>

        <div className="flex flex-wrap mt-8">
          {[
            {
              emoji: "🖊️",
              heading: t("signup"),
              description: t(
                "join_our_affiliate_program_get_your_unique_referral_link"
              ),
            },
            {
              emoji: "📣",
              heading: t("promote"),
              description: t("share_ai_Carousels_with_your_audience"),
            },
            {
              emoji: "🤑",
              heading: t("earn"),
              description: t(
                "earn_a_40_percent_commission_on_all_payments_from_your_referrals"
              ),
            },
          ].map(({ emoji, heading, description }, index) => (
            <div key={`item_${index}`} className="w-1/3  p-2 space-y-4">
              <span className="text-5xl font-semibold">{emoji}</span>
              <h5 className="text-lg font-semibold">
                {index + 1}. {heading}
              </h5>
              <p className="text-sm font-normal">{description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section containerClassName="flex flex-col items-start gap-4">
        <h1 className="text-5xl font-medium">
          {t("start_earning_more_today")}
        </h1>
        <p className="text-lg font-normal">
          {t("join_today_and_start_earning_passive_income")}
        </p>
        <LinkButton href={AFFILIATE_SIGNUP_PAGE_PATH} variant="blue">
          {t("join_the_affiliate_program")}
        </LinkButton>
        <p className="text-xs font-normal">
          {t(
            "by_pressing_join_the_affiliate_program_you_agree_to_our_program_terms"
          )}
        </p>
      </Section>
    </>
  );
};

export default memo(AffiliateProgram);
