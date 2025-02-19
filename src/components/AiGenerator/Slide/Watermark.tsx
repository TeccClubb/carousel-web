import React, { FC, memo } from "react";
import { getBrightness } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Watermark: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
  const domainName = "CarouselBuilder.io";
  const { t } = useTranslation();
  return (
    <div
      className="w-full h-[2.25em] flex items-center justify-center absolute top-0 right-0 z-[999]"
      style={{
        backgroundColor:
          getBrightness(backgroundColor) > 128 ? "#000000" : "#FFFFFF",
        color: backgroundColor,
      }}
    >
      <div className="text-[1.5em] font-semibold leading-[1.1]">
        {t("slide_water_mark_text")}&nbsp;{domainName}
      </div>
    </div>
  );
};

export default memo(Watermark);
