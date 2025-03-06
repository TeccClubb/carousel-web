import { backgroundPattern } from "@/assets/slide-backgrounds";
import { getBrightness } from "@/lib/utils";
import { CarouselData } from "@/types";
import React, { CSSProperties, FC, memo } from "react";

const BgOverlay: FC<{
  bgColor: string;
  isOddSlide: boolean;
  carouselData: CarouselData;
}> = ({ bgColor, isOddSlide, carouselData }) => {
  const {
    backgroundOverlay: {
      backgroundId,
      overlayOpacity = 8,
      cornerElementId,
      cornerElementOpacity = 20,
      isOverlayFadeCorner,
    },
    colors: { backgroundColor, accentColor },
  } = carouselData;

  const background =
    cornerElementId === "element_3"
      ? `radial-gradient(${backgroundColor}, ${accentColor})`
      : cornerElementId === "element_2"
      ? `radial-gradient(circle at 50% 50%, ${accentColor} 0, transparent 70%)`
      : "none";

  const leftElementClassName = `absolute ${
    isOddSlide ? "left-0" : "right-0"
  } bottom-0 w-[25em] h-[25em] rounded-[50%]`;
  const rightElementClassName = `absolute -top-[14%] ${
    isOddSlide ? "right-0" : "left-0"
  } w-[25em] h-[25em] rounded-[50%]`;

  const leftElementStyles: CSSProperties = {
    backgroundColor: accentColor,
    background,
    transform: isOddSlide ? "translate(-50%, 40%)" : "translate(50%, 40%)",
  };

  const rightElementStyles: CSSProperties = {
    backgroundColor: accentColor,
    background,
    transform: isOddSlide ? "translateX(50%)" : "translateX(-50%)",
  };

  return (
    <>
      <div
        className="w-full h-full absolute left-0 top-0 overflow-hidden inline-block z-[4]"
        style={{ opacity: cornerElementOpacity / 100 }}
      >
        {cornerElementId === "element_1" && (
          <>
            <div
              className={`w-1/2 h-1/2 transform absolute ${
                isOddSlide
                  ? "left-0 -translate-x-1/4"
                  : "right-0 translate-x-3/4 translate-y-0"
              } bottom-0 text-[20em] text-left leading-[1.9] whitespace-nowrap font-bold select-none pointer-events-none`}
              style={{ color: accentColor, fontFamily: "inter" }}
            >
              →
            </div>

            <div
              className={`w-1/2 h-1/2 transform absolute ${
                isOddSlide
                  ? "right-0 translate-x-1/2"
                  : "left-0 -translate-x-1/2"
              } top-0 text-[25em] text-right leading-[.8] whitespace-nowrap font-bold select-none pointer-events-none`}
              style={{ color: accentColor, fontFamily: "inter" }}
            >
              →
            </div>
          </>
        )}

        {cornerElementId !== "element_1" && (
          <>
            <div
              className={leftElementClassName}
              style={leftElementStyles}
            ></div>
            <div
              className={rightElementClassName}
              style={rightElementStyles}
            ></div>
          </>
        )}
      </div>
      <div
        className="w-full h-full absolute left-0 top-0 z-[2]"
        style={backgroundPattern({
          backgroundId,
          fillColor:
            getBrightness(bgColor) > 200
              ? "#000000"
              : getBrightness(bgColor) < 80
              ? "#FFFFFF"
              : "#808080",
          opacity: overlayOpacity / 100,
        })}
      />
      {isOverlayFadeCorner && (
        <div
          className="w-full h-full absolute left-0 top-0 z-[3]"
          style={{
            backgroundImage: `radial-gradient(circle, ${bgColor}00 0%, ${bgColor} 100%)`,
          }}
        />
      )}
    </>
    // <div
    //   className="w-full h-full absolute left-0 top-0 z-[2]"
    //   style={{
    //     backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='192' height='192' viewBox='0 0 192 192'><path fill='%23808080' fill-opacity='0.08' d='M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z' /></svg>")`,
    //     backgroundSize: "37.4px",
    //     backgroundRepeat: "repeat",
    //   }}
    // />
  );
};

export default memo(BgOverlay);
