import React, { FC, memo } from "react";
import { getBrightness } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { getArrow } from "@/icons/arrows";

const ArrowText: FC<{
  accentColor: string;
  arrowId: string;
  isOnlyArrow: boolean;
  text: string;
}> = ({ accentColor, arrowId, isOnlyArrow, text }) =>
  !isOnlyArrow ? (
    <div
      className="w-auto h-[4em] py-[3em] px-[1.5em] font-medium flex items-center justify-center gap-[1em] rounded-[99em] absolute right-[3.75em] bottom-[3.75em] z-[999]"
      style={{
        color: getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
        backgroundColor: accentColor,
      }}
    >
      {text && <div className="text-[2em] pl-[0.5em]">{text}</div>}
      <div className="text-[1.5em]">
        <ChevronRightIcon className="h-[2em] w-[2em]" />
      </div>
    </div>
  ) : (
    <div
      className="absolute right-[3.75em] bottom-[3.75em] z-[999]"
      style={{ color: accentColor }}
    >
      {getArrow(arrowId)}
    </div>
  );

export default memo(ArrowText);
