import React, { FC, memo } from "react";
import { Skeleton } from "../ui";
import { cn } from "@/lib/utils";

const SkeletonCard: FC<{ className?: string }> = ({ className }) => (
  <div className={cn("flex flex-col space-y-3", className)}>
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export default memo(SkeletonCard);
