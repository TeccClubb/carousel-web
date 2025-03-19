import { cn } from "@/lib/utils";
import React, { FC, memo, ReactNode } from "react";
import { Skeleton } from "../ui";

const ReportCard: FC<{
  title: string;
  icon: ReactNode;
  value: string | number;
  isLoading: boolean;
  valueClassName?: string;
}> = ({ title, icon, value, isLoading, valueClassName }) => (
  <div className="flex items-start justify-start w-full">
    <div className="bg-white/100 text-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 flex flex-col rounded-lg w-full shadow-lg p-6 h-40 transition-all duration-300">
      <div className="text-xl font-bold">{title}</div>
      <div className="mt-auto flex justify-between items-center">
        <div className={cn("text-2xl font-semibold", valueClassName)}>
          {isLoading && <Skeleton className="h-6 w-32" />}
          {!isLoading && value}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  </div>
);

export default memo(ReportCard);
