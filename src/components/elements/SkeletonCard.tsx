import React, { FC, memo } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const SkeletonCard: FC<{ className?: string }> = ({ className }) => (
  <div className={cn("flex flex-col gap-4 p-4", className)}>
    <Skeleton className="h-40 rounded-md" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export default memo(SkeletonCard);
