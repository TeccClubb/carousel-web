"use client";
import React, { FC, memo } from "react";
import Watermark from "./Watermark";
import Brand from "./Brand";
import BgOverlay from "./BgOverlay";
import SlideHeader from "./SlideHeader";
import SlideContent from "./SlideContent";
import ArrowText from "./ArrowText";
import { CarouselData, SlideContent as SlideContentType, User } from "@/types";

const Slide: FC<{
  slide: SlideContentType;
  index: number;
  carouselData: CarouselData;
  user: User | null;
  onClick?: () => void;
  isDownloadRequest?: boolean;
}> = ({ slide, index, carouselData, user, onClick, isDownloadRequest }) => {
  const {
    colors: { isAlternateSlideColors, backgroundColor, textColor, accentColor },
    brand: { isShowInIntroSlide, isShowInOutroSlide, isShowInRegularSlide },
    settings: { isShowWaterMark },
    arrowText: { arrowId, isOnlyArrow, introSlideArrow, regularSlideArrow },
    contentText: {
      secondaryFont: { name: secondaryFont },
    },
    slideRatio: { width, height },
  } = carouselData;

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
    <div
      onClick={onClick}
      className="h-full float-left outline-none select-none cursor-default"
    >
      {!isDownloadRequest && (
        <SlideHeader type={slide.type || "regular"} index={index} />
      )}

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
              <BgOverlay
                index={index}
                bgColor={bgColor}
                isOddSlide={isOddSlide}
                carouselData={carouselData}
              />

              <SlideContent
                slide={slide}
                index={index}
                color={color}
                bgColor={bgColor}
                accentColor={accentColor}
                carouselData={carouselData}
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
                <Brand color={color} carouselData={carouselData} user={user} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Slide);
