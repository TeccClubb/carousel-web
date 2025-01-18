import React, { FC } from "react";
import { getBrightness } from "@/lib/utils";

const Watermark: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
  const domainName = "TechClub";
  return (
    <div
      className="w-full h-[2.25em] flex items-center justify-center absolute top-0 right-0 z-[999]"
      style={{
        backgroundColor: getBrightness(backgroundColor) > 128 ? "#000000" : "#FFFFFF",
        color: backgroundColor,
      }}
    >
      <div className="text-[1.5em] font-semibold leading-[1.1]">
        Created with {domainName}
      </div>
    </div>
  );
};

export default Watermark;
