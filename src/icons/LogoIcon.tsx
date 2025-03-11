import React, { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LogoIcon: FC<{
  className?: string;
}> = ({ className }) => (
  <Image
    src="/logo.jpeg"
    alt="logo"
    width={100}
    height={100}
    sizes="100vw"
    placeholder="blur"
    blurDataURL="/logo.jpeg"
    className={cn("h-full w-auto rounded-md", className)}
  />
);

export default LogoIcon;
