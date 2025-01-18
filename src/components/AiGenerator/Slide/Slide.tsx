import React, { FC } from "react";
import Watermark from "./Watermark";
import { useCarouselsState } from "@/hooks";
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
    fontFamily,
    colors: { isAlternateSlideColors, backgroundColor, textColor, accentColor },
    brand: { isShowInIntroSlide, isShowInOutroSlide, isShowInRegularSlide },
    settings: { isShowWaterMark, isHideCounter },
    arrowText: { arrowId, isOnlyArrow, introSlideArrow, regularSlideArrow },
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

  const handleChangeBackground = () => {};

  const handleAddSlide = () => {};

  const handleDeleteSlide = () => {};

  return (
    <div className="h-full mx-[2px] float-left outline-none">
      <SlideHeader
        type={slide.type || "regular"}
        handleChangeBackground={handleChangeBackground}
        handleAddSlide={handleAddSlide}
        handleDeleteSlide={handleDeleteSlide}
      />

      <div className="w-[67.5em] h-[84.375em] shadow-md">
        <div className="relative w-full pb-[125%]">
          <div className="bg-muted absolute top-0 bottom-0 right-0 left-0">
            <div
              className="w-full h-full p-[3.75em] flex flex-col relative justify-center"
              style={{
                fontFamily: fontFamily,
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
                (isIntroSlide
                  ? introSlideArrow.isEnabled && (
                      <ArrowText
                        accentColor={accentColor}
                        arrowId={arrowId}
                        text={introSlideArrow.text}
                        isOnlyArrow={isOnlyArrow}
                      />
                    )
                  : regularSlideArrow.isEnabled && (
                      <ArrowText
                        accentColor={accentColor}
                        arrowId={arrowId}
                        text={regularSlideArrow.text}
                        isOnlyArrow={isOnlyArrow}
                      />
                    ))}

              {isIntroSlide
                ? isShowInIntroSlide && <Brand color={color} />
                : isOutroSlide
                ? isShowInOutroSlide && <Brand color={color} />
                : isShowInRegularSlide && <Brand color={color} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
