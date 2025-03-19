"use client";
import React, { FC, memo } from "react";
import { PlanIcon, ProjectIcon } from "@/icons";
import ReportCard from "./ReportCard";
import ProjectCard from "./ProjectCard";
import SideBar from "./SideBar";
import { CAROUSEL_GENERATOR_PAGE_PATH } from "@/pathNames";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  ScrollArea,
  Separator,
} from "../ui";
import { SkeletonCard } from "../elements";
import { useAppState } from "@/hooks/use-app-state";
import { useDispatch } from "react-redux";
import { setCarousel } from "@/store/carousels.slice";
import { useCarousels } from "@/hooks/use-carousels";
import { useActivePlanCookie, useUserCookie } from "@/hooks/use-cookie";
import { useTranslations } from "next-intl";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { user } = useUserCookie();
  const { activePlan } = useActivePlanCookie();
  const { dashboardActiveItem, isClient } = useAppState();
  const { isLoading, carousels } = useCarousels();

  // const startDate = new Date(activePlan!.start_date);
  const today = new Date();
  const endDate = isClient ? new Date(activePlan!.end_date) : new Date();

  const remainingDays = Math.floor(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start gap-0 overflow-hidden">
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:z-50 min-h-[calc(100vh-4rem)]">
        <SideBar />
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] flex-1 lg:border-x">
        <div className="py-10 lg:px-8 md:px-6 px-4 flex flex-col space-y-8">
          {dashboardActiveItem === "dashboard" && (
            <>
              <div className="w-full">
                <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("dashboard")}
                </h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  <ReportCard
                    title={t("total_projects")}
                    value={0}
                    icon={<ProjectIcon />}
                    isLoading={!isClient}
                  />
                  <ReportCard
                    title={t("subscription")}
                    value={`${remainingDays} ${t("days_left")}`}
                    icon={<PlanIcon className="w-10 h-10" />}
                    isLoading={isLoading}
                    valueClassName={`${
                      remainingDays < 3
                        ? "text-red-600"
                        : remainingDays < 7
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("your_projects")}
                </h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {isLoading &&
                    Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonCard key={`skeleton_${index}`} />
                    ))}
                  {!isLoading &&
                    carousels.map((carousel) => (
                      <ProjectCard
                        key={carousel.carouselId}
                        link={CAROUSEL_GENERATOR_PAGE_PATH}
                        imageSrc={carousel.imageSrc}
                        title={carousel.title}
                        onClick={() => dispatch(setCarousel(carousel))}
                      />
                    ))}
                  {carousels.length === 0 && (
                    <div className="text-center text-muted-foreground">
                      {t("no_carousels_found")}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {dashboardActiveItem === "profile" && (
            <div className="w-full">
              <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("your_profile")}
              </h2>

              {isClient && user && (
                <div className="flex sm:flex-row flex-col gap-6 items-center">
                  <Avatar className="size-36 transition-all hover:scale-105">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center sm:items-start flex-col sm:text-3xl text-2xl">
                    <span className="font-bold">{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {dashboardActiveItem === "billing_details" && (
            <div className="w-full">
              <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("billing_details")}
              </h2>

              {isClient && user && (
                <Card>
                  <CardHeader className="hidden">
                    <CardTitle>Billing Details</CardTitle>
                    <CardDescription>
                      Billing Details Description
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="md:p-24 p-6">
                    <div className="flex flex-col sm:flex-row sm:gap-16 gap-8">
                      {isClient && user && (
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
                          { name: "Email", value: user.email },
                          { name: "Name", value: user.name },
                          { name: "Subscription Type", value: "Paid" },
                          {
                            name: "Subscription Status",
                            value: activePlan.status,
                          },
                          {
                            name: "Billing Cycle",
                            value: `${
                              activePlan.duration > 1 && activePlan.duration
                            } ${activePlan.duration_unit}`,
                          },
                          {
                            name: "Expires On",
                            value: new Intl.DateTimeFormat("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(new Date(activePlan.end_date)),
                          },
                        ].map(({ name, value }) => (
                          <div
                            key={name}
                            className="sm:flex space-x-0 space-y-1 sm:space-x-3 sm:space-y-0"
                          >
                            <p className="text-sm font-medium">{name}:</p>
                            <p className="text-sm text-muted-foreground">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default memo(Dashboard);
