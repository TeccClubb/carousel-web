import React, { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CarouselBuilderLogo: FC<{ className?: string }> = ({ className }) => (
  <Image
    src="/carousel-builder-logo.png"
    alt="logo"
    width={100}
    height={100}
    sizes="100vw"
    placeholder="blur"
    blurDataURL="/carousel-builder-logo.png"
    className={cn("h-auto w-32", className)}
  />
);

export default CarouselBuilderLogo;
