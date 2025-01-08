import React, { FC } from "react";
import Section from "../sections/Section";
import ReportCard from "./ReportCard";
import { ProjectIcon } from "@/icons";
import ProjectCard from "./ProjectCard";

const Dashboard: FC = () => {
  return (
    <Section className="flex-col space-y-8">
      {/* <div className="xl:self-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
        <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
        <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
        <ReportCard title="Total" value={0} icon={<ProjectIcon />} />
        {/* <ReportCard title="Total" value={0} icon={<ProjectIcon />} /> */}
      </div>

      <div className="w-full">
        <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Your Projects
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </Section>
  );
};

export default Dashboard;
