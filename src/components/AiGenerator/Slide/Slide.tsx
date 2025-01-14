import React, { FC } from "react";
import "@/css/slide.css";
import { SlideType } from "@/types";
import Watermark from "./Watermark";
// import Image from "next/image";
import { useCarouselsState } from "@/hooks";
import Brand from "./Brand";
import BgOverlay from "./BgOverlay";
import { isColorDark } from "@/lib/utils";

const Slide: FC<SlideType & { index: number }> = ({
  index,
  // slideClass,
  isSlideNumber,
  subTitle,
  title,
  description,
  ctaButton,
  image,
}) => {
  const {
    currentIndex,
    fontFamily,
    colors: { isAlternateSlideColors, backgroundColor, textColor, accentColor },
    settings: {
      isShowWaterMark,
      // isHideIntroSlide,
      // isHideOutroSlide,
      // isHideCounter,
    },
  } = useCarouselsState();

  const isActive = index === currentIndex;

  const isOddSlide = (index + 1) % 2 !== 0;

  const color = isAlternateSlideColors
    ? isOddSlide
      ? textColor
      : backgroundColor
    : textColor;

  const bgColor = isAlternateSlideColors
    ? isOddSlide
      ? backgroundColor
      : textColor
    : backgroundColor;

  return (
    <div
      style={{ outline: "none" }}
      data-index={index}
      className={`slick-slide${
        isActive ? " slick-active slick-center slick-current" : ""
      }`}
      tabIndex={-1}
      // aria-hidden={!isActive}
      // aria-hidden={!isActive}
    >
      <div>
        <div className="py-1 flex justify-between">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            // aria-controls="radix-:Rn59v7rrnakq:"
            data-state="closed"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-background h-4 w-4"
            >
              <path d="M4 8l4 -4"></path>
              <path d="M14 4l-10 10"></path>
              <path d="M4 20l16 -16"></path>
              <path d="M20 10l-10 10"></path>
              <path d="M20 16l-4 4"></path>
            </svg>
            <span className="sr-only">Background Image</span>
          </button>
          <div>
            <button
              data-state="closed"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-circle-plus h-4 w-4"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
              </svg>
              <span className="sr-only">Add Slide</span>
            </button>
            <button
              data-state="delayed-open"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-trash text-red-500 h-4 w-4"
              >
                <path d="M4 7l16 0"></path>
                <path d="M10 11l0 6"></path>
                <path d="M14 11l0 6"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
              <span className="sr-only">Delete Slide</span>
            </button>
            {/* <div data-radix-popper-content-wrapper="" style={{ position: "fixed", left: "0px", top: "0px", transform: "translate(71px, 44px)", minWidth: "max-content", }}><div data-side="bottom" data-align="center" data-state="instant-open" className="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" >Add Slide<span id="radix-:R3759v7rrnakq:" role="tooltip" style={{ position: "absolute", border: "0px", width: "1px", height: "1px", padding: "0px", margin: "-1px", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", whiteSpace: "nowrap", overflowWrap: "normal" }}>Add Slide</span></div></div> */}
          </div>
        </div>

        <div
          className="carousel_slide_wrrapper shadow-md"
          style={{ width: "67.5em", height: "84.375em" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "125%",
            }}
          >
            <div
              className="bg-muted"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <div
                className="w-full h-full p-[3.75em] flex flex-col relative justify-center"
                style={{
                  fontFamily: fontFamily,
                  backgroundColor: bgColor,
                }}
              >
                <BgOverlay
                  color={color}
                  bgColor={bgColor}
                  isOddSlide={isOddSlide}
                />

                {/* Slide Content */}
                <div className="h-full pb-[8em] flex flex-col gap-[2em] z-[999]">
                  <div className="text-[0.8em] flex-1 flex flex-col items-start justify-center gap-[1.25em] text-left relative transition-all duration-300 z-[999]">
                    {isSlideNumber && (
                      <div
                        className="w-[2em] h-[2em] p-[3em] flex justify-center items-center rounded-[99em] z-[999]"
                        style={{
                          backgroundColor: accentColor,
                          color: isColorDark(accentColor)
                            ? "#FFFFFF"
                            : "#000000",
                        }}
                      >
                        <div className="text-[2.5em] text-semibold">
                          {index}
                        </div>
                      </div>
                    )}

                    {subTitle && subTitle.isEnabled && (
                      <div
                        className="text-[2.25em] leading-[1.1] mb-[0.195rem]"
                        style={{ color: accentColor }}
                      >
                        {subTitle.text}
                      </div>
                    )}

                    {title && title.isEnabled && (
                      <div
                        className="text-[5.625em] mb-[0.196296rem] break-words font-semibold whitespace-pre-wrap leading-[1.3]"
                        style={{color}}
                        dangerouslySetInnerHTML={{
                          __html: title.text
                            .replace(/<c>/g, "<span>")
                            .replace(/<\/c>/g, "</span>")
                            .replace(
                              /<span>/g,
                              `<span style="color:${accentColor};">`
                            ),
                        }}
                      ></div>
                    )}

                    {description && description.isEnabled && (
                      <div className="m-0 text-[3.625em] leading-tight opacity-90" style={{ color }}>
                        <p>{description.text}</p>
                      </div>
                    )}

                    {ctaButton && ctaButton.isEnabled && (
                      <div className="text-[2.5em] w-fit h-auto flex items-center justify-center text-left mt-[1em] z-[999]">
                        <div
                          className="px-[1.5em] py-[0.5em] rounded-[99em]"
                          style={{
                            backgroundColor: accentColor,
                            color: isColorDark(accentColor)
                              ? "#FFFFFF"
                              : "#000000",
                          }}
                        >
                          {ctaButton.text}
                        </div>
                      </div>
                    )}
                  </div>

                  {image && image.isEnabled && (
                    <div
                      className="flex-1 overflow-hidden relative"
                      style={{
                        borderColor: bgColor,
                      }}
                    >
                      <div
                        className="w-full h-full bg-center bg-cover bg-no-repeat rounded-[1em] opacity-100 overflow-hidden z-[999]"
                        style={{backgroundImage: `url(${image.src})`}}
                      ></div>
                    </div>
                  )}
                </div>

                {isShowWaterMark && <Watermark />}

                <Brand color={color} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
