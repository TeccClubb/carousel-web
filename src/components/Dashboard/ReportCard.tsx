import React, { FC, ReactNode } from "react";

const ReportCard: FC<{
  title: string;
  icon: ReactNode;
  value: string | number;
  description?: string;
}> = ({ title, icon, value, description }) => {
  return (
    // <div>
    //   <div className="bg-white border bottom-1 rounded transition-all"></div>
    // </div>

    // <div className={`rounded-lg shadow-md p-6 bg-white/100 text-white w-60 h-40`}>
    //   <div className="flex justify-between items-center mb-4">
    //     <div className="text-xl font-bold">{"title"}</div>
    //     <div className="text-3xl">{"icon"}</div>
    //   </div>
    //   <div className="text-2xl font-semibold">{"value"}</div>
    //   <div className="mt-2 text-sm">{"description"}</div>
    // </div>

    <div className="bg-white/100 text-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 flex flex-col rounded-lg shadow-lg p-6 w-full md:w-60 h-40 transition-all duration-300">
      <div className="flex-1 flex justify-between items-center mb-4">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      {description && <div className="mt-2 text-sm">{description}</div>}
    </div>

    // <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 h-40 transition-all duration-300">
    //   <div className="flex items-center space-x-3">
    //     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    //     <div className="text-2xl text-gray-500 dark:text-gray-300">{icon}</div>
    //   </div>
    //   <div className="mt-4">
    //     <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    //   </div>
    // </div>
  );
};

export default ReportCard;
