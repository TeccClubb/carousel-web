import React, { FC, ReactNode } from "react";

const ReportCard: FC<{
  title: string;
  icon: ReactNode;
  value: string | number;
}> = ({ title, icon, value }) => (
  <div className="flex items-center justify-center">
    <div className="bg-white/100 text-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 flex flex-col rounded-lg shadow-lg p-6 w-full md:w-60 h-40 transition-all duration-300">
      <div className="text-xl font-bold">{title}</div>
      <div className="mt-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  </div>
);

export default ReportCard;
