"use client";
import React, { FC, memo } from "react";
import Section from "./Section";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LinkButton } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useActivePlanCookie, useUserCookie } from "@/hooks/use-cookie";
import { useAppState } from "@/hooks/use-app-state";
import { getFormattedDate } from "@/lib/utils";
import { PRICING_PAGE_PATH } from "@/pathNames";

const BillingDetailsSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const t = useTranslations();
  const { isAppMounted } = useAppState();
  const { user } = useUserCookie();
  const { activePlan } = useActivePlanCookie();

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
    >
      <div className="flex flex-col gap-y-8 w-full">
        <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
          {t("billing_details")}
        </h1>

        {isAppMounted && user && (
          <Card className="bg-transparent">
            <CardHeader className="hidden">
              <CardTitle>Billing Details</CardTitle>
              <CardDescription>Billing Details Description</CardDescription>
            </CardHeader>
            <CardContent className="md:p-24 p-6">
              <div className="flex flex-col sm:flex-row sm:gap-16 gap-8">
                {isAppMounted && user && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Avatar className="size-32 transition-all hover:scale-105">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <Label asSpan>{user.name}</Label>
                  </div>
                )}
                <Separator className="sm:hidden" />
                <Separator
                  orientation="vertical"
                  className="h-auto hidden sm:block"
                />
                <div className="flex flex-col space-y-4 p-4">
                  {[
                    { name: t("email"), value: user.email },
                    { name: t("name"), value: user.name },
                    { name: t("subscription_type"), value: t("paid") },
                    {
                      name: t("subscription_status"),
                      value: activePlan.status,
                    },
                    {
                      name: t("billing_cycle"),
                      value: `${activePlan.duration} ${activePlan.duration_unit}`,
                    },
                    {
                      name: t("expires_on"),
                      value: getFormattedDate(activePlan.end_date),
                    },
                  ].map(({ name, value }) => (
                    <div
                      key={name}
                      className="sm:flex space-x-0 space-y-1 sm:space-x-3 sm:space-y-0"
                    >
                      <p className="text-sm font-medium">{name}:</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  ))}
                  <LinkButton
                    href={PRICING_PAGE_PATH}
                    variant="blue"
                    className="w-full rounded-full"
                  >
                    {t("upgrade")}
                  </LinkButton>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Section>
  );
};

export default memo(BillingDetailsSection);
