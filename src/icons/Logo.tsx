import React, { FC } from "react";
import LogoIcon from "./LogoIcon";
import CarouselBuilderLogo from "./CarouselBuilderLogo";
import { cn } from "@/lib/utils";

const Logo: FC<{ className?: string }> = ({ className }) => (
  <div className={cn("flex items-center justify-center gap-2 h-8", className)}>
    <LogoIcon />
    <CarouselBuilderLogo />
  </div>
);

export default Logo;
