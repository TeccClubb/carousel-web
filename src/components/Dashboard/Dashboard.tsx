"use client";
import React, { FC } from "react";
import { BarsIcon, LogoIcon, PlanIcon, ProjectIcon } from "@/icons";
import ReportCard from "./ReportCard";
import ProjectCard from "./ProjectCard";
import SideBar from "./SideBar";
import Link from "next/link";
import { HOME_PAGE_PATH } from "@/pathNames";
import { ScrollArea } from "../ui";
import { Avatar } from "../elements";

const Dashboard: FC = () => (
  <div className="bg-white">
    <div className="bg-[#0139FF] border-gray-200 sticky top-0 z-40 flex items-center h-16 px-4 sm:px-6 md:px-8 gap-4 border-b shadow-sm">
      <button className="lg:hidden text-white p-2.5 -m-2.5">
        <BarsIcon className="w-5 h-5" />
      </button>
      <div className="w-px h-6 lg:hidden bg-white" aria-hidden="true"></div>
      <Link href={HOME_PAGE_PATH} className="px-3 py-2" aria-current="page">
        <LogoIcon className="w-24 h-auto text-white" />
      </Link>

      <div className="flex flex-1 lg:gap-6 gap-4 self-stretch">
        {/* <form className="grid grid-cols-1 flex-1 relative">
              <Input
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="pl-10 pr-4 self-center row-start-1 col-start-1"
              />
              <SearchIcon
                className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"

              />

            </form> */}
      </div>

      <Avatar />
    </div>
    <div className="flex min-h-[calc(100vh-4rem)]">
      <SideBar />
      <ScrollArea className="h-[calc(100vh-4rem)] flex-1">
        <main className="py-10">
          <div className="lg:px-8 md:px-6 px-4 flex flex-col space-y-8">
            <div className="w-full">
              <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Dashboard
              </h2>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <ReportCard
                  title="Total Projects"
                  value={0}
                  icon={<ProjectIcon />}
                />
                <ReportCard
                  title="Subscription"
                  value="3 days left"
                  icon={<PlanIcon className="w-10 h-10" />}
                />
              </div>
            </div>

            <div className="w-full">
              <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Projects
              </h2>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                <ProjectCard
                  link="https://google.com"
                  imageSrc="/apple-watches.jpg"
                  title="This image is not found"
                />
                <ProjectCard
                  link="https://google.com"
                  imageSrc="/apple-watches.jpg"
                  title="This image is not found"
                />
                <ProjectCard
                  link="https://google.com"
                  imageSrc="/apple-watches.jpg"
                  title="This image is not found"
                />
                <ProjectCard
                  link="https://google.com"
                  imageSrc="/apple-watches.jpg"
                  title="This image is not found"
                />
                <ProjectCard
                  link="https://google.com"
                  imageSrc="/apple-watches.jpg"
                  title="This image is not found"
                />
              </div>
            </div>
          </div>
        </main>
      </ScrollArea>
    </div>
  </div>
);

export default Dashboard;
