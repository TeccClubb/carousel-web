"use client";
import React, { FC, memo } from "react";
import Watermark from "./Watermark";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import Brand from "./Brand";
import BgOverlay from "./BgOverlay";
import SlideHeader from "./SlideHeader";
import SlideContent from "./SlideContent";
import ArrowText from "./ArrowText";
import { SlideContent as SlideContentType } from "@/types";

const Slide: FC<{ slide: SlideContentType; index: number }> = ({
  slide,
  index,
}) => {
  const {
    carousel: {
      data: {
        colors: {
          isAlternateSlideColors,
          backgroundColor,
          textColor,
          accentColor,
        },
        brand: { isShowInIntroSlide, isShowInOutroSlide, isShowInRegularSlide },
        settings: { isShowWaterMark, isHideCounter },
        arrowText: { arrowId, isOnlyArrow, introSlideArrow, regularSlideArrow },
        contentText: {
          secondaryFont: { name: secondaryFont },
        },
        slideRatio: { width, height },
      },
    },
  } = useCarouselsState();

  const isIntroSlide = slide.type === "intro";
  const isOutroSlide = slide.type === "outro";

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
    <div className="h-full mx-[2px] float-left outline-none">
      <SlideHeader type={slide.type || "regular"} index={index} />

      <div
        className="shadow-md"
        style={{ width: `67.5em`, height: `${(height / width) * 67.5}em` }}
      >
        <div
          className="relative w-full h-full"
          style={{ paddingBottom: `${(height / width) * 100}%` }}
        >
          <div className="bg-muted absolute top-0 bottom-0 right-0 left-0">
            <div
              className="w-full h-full p-[3.75em] flex flex-col relative justify-center"
              style={{
                fontFamily: `${secondaryFont}, sans-serif`,
                backgroundColor: bgColor,
              }}
            >
              <BgOverlay bgColor={bgColor} isOddSlide={isOddSlide} />

              <SlideContent
                slide={slide}
                index={index}
                isHideCounter={isHideCounter}
                color={color}
                bgColor={bgColor}
                accentColor={accentColor}
              />

              {isShowWaterMark && (
                <Watermark backgroundColor={backgroundColor} />
              )}

              {!isOutroSlide &&
                ((isIntroSlide && introSlideArrow.isEnabled) ||
                regularSlideArrow.isEnabled ? (
                  <ArrowText
                    accentColor={accentColor}
                    arrowId={arrowId}
                    text={
                      isIntroSlide
                        ? introSlideArrow.text
                        : regularSlideArrow.text
                    }
                    isOnlyArrow={isOnlyArrow}
                  />
                ) : null)}

              {(isIntroSlide && isShowInIntroSlide) ||
              (isOutroSlide && isShowInOutroSlide) ||
              (isShowInRegularSlide && !isIntroSlide && !isOutroSlide) ? (
                <Brand color={color} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Slide);
