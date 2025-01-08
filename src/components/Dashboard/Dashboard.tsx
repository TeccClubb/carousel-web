import React, { FC } from "react";
import { DashboardIcon, LogoIcon, SettingsIcon } from "@/icons";
import Link from "next/link";

const Dashboard: FC = () => {
  return (
    // <Section className="flex-col space-y-8">
    //   {/* <div className="xl:self-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> */}
    //   <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    //     <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
    //     <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
    //     <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
    //     <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
    //     {/* <ReportCard title="Total" value={0} icon={<ProjectIcon />} /> */}
    //   </div>

    //   <div className="w-full">
    //     <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
    //       Your Projects
    //     </h2>
    //     <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
    //       <ProjectCard
    //         link="https://google.com"
    //         imageSrc="/apple-watches.jpg"
    //         title="This image is not found"
    //       />
    //       <ProjectCard
    //         link="https://google.com"
    //         imageSrc="/apple-watches.jpg"
    //         title="This image is not found"
    //       />
    //       <ProjectCard
    //         link="https://google.com"
    //         imageSrc="/apple-watches.jpg"
    //         title="This image is not found"
    //       />
    //       <ProjectCard
    //         link="https://google.com"
    //         imageSrc="/apple-watches.jpg"
    //         title="This image is not found"
    //       />
    //       <ProjectCard
    //         link="https://google.com"
    //         imageSrc="/apple-watches.jpg"
    //         title="This image is not found"
    //       />
    //     </div>
    //   </div>
    // </Section>

    <div className="bg-white">
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:z-50 lg:inset-y-0 lg:fixed">
        <div className="flex pb-4 px-6 bg-blue-600 overflow-y-auto gap-y-5 flex-col flex-grow">
          <div className="flex shrink-0 items-center h-16">
            <LogoIcon className="w-auto h-8" />
          </div>
          <nav className="flex flex-col flex-1">
            <ul role="list" className="flex flex-col flex-1 gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  <li>
                    <Link
                      href={"/df"}
                      className="text-white bg-blue-700 flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3"
                    >
                      <DashboardIcon />
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mt-auto">
                    <Link
                      href={"/df"}
                      className="text-white bg-blue-700 flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3"
                    >
                      <SettingsIcon />
                      Settings
                    </Link>
                  </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="lg:pl-72"></div>
    </div>
  );
};

export default Dashboard;
