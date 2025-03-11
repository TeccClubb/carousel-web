import { cn } from "@/lib/utils";
import React, { FC, memo, ReactNode } from "react";

const Section: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}> = ({
  isHeroSection,
  showGradient,
  cornerGradient,
  className,
  containerClassName,
  children,
}) => (
  <section
    className={cn(
      `flex items-center justify-center bg-cover bg-center w-full overflow-hidden relative ${
        isHeroSection ? "min-h-[calc(100vh-4rem)]" : "h-auto"
      } ${
        showGradient
          ? "bg-gradient-to-r from-[#F0F6FD] to-[#FFFFFF] dark:bg-gradient-to-r dark:from-[#1E1E2F] dark:to-[#2D2D44]"
          : ""
      }`,
      className
    )}
  >
    <div
      className={cn(
        `flex flex-wrap items-center justify-center w-full max-w-7xl ${
          isHeroSection ? "p-4" : "px-4 py-12 lg:py-14"
        } mx-auto z-0`,
        containerClassName
      )}
    >
      {children}
    </div>
    {cornerGradient && (
      <div
        className={`absolute top-0 ${
          cornerGradient === "left" ? "-left-12" : "-right-12"
        } w-80 h-80 bg-[#0F73F6] opacity-10 blur-3xl rounded-full`}
      ></div>
    )}
  </section>
);

export default memo(Section);
