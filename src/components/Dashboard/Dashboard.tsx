"use client";
import React, { FC, memo } from "react";
import { PlanIcon, ProjectIcon } from "@/icons";
import ReportCard from "./ReportCard";
import ProjectCard from "./ProjectCard";
import SideBar from "./SideBar";
import { CAROUSEL_GENERATOR_PAGE_PATH } from "@/pathNames";
import { Avatar, AvatarFallback, AvatarImage, ScrollArea } from "../ui";
import { SkeletonCard } from "../elements";
import { useAppState } from "@/hooks/use-app-state";
import { useDispatch } from "react-redux";
import { setCarousel } from "@/store/carousels.slice";
import { useCarousels } from "@/hooks/use-carousels";
import { useUserState } from "@/hooks/use-user-state";
import { useTranslations } from "next-intl";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { userData: user } = useUserState();
  const { dashboardActiveItem } = useAppState();
  const { isLoading, carousels } = useCarousels();

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
                  />
                  <ReportCard
                    title={t("subscription")}
                    value="3 days left"
                    icon={<PlanIcon className="w-10 h-10" />}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("your_projects")}
                </h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {isLoading &&
                    Array.from({ length: 4 }).map((_, index) => (
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

              <div className="flex gap-6 items-center">
                <Avatar className="size-36 transition-all hover:scale-105">
                  {user && user.avatar && <AvatarImage src={user.avatar} />}
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-3xl">
                  <span className="font-bold">{user?.name}</span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default memo(Dashboard);
