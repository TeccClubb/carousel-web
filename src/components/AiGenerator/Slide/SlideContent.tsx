import React, { FC } from "react";
import { useContentText, useLastIndex, useSlides } from "@/hooks";
import { getBrightness } from "@/lib/utils";

const SlideContent: FC<{
  index: number;
  isHideCounter: boolean;
  color: string;
  bgColor: string;
  accentColor: string;
}> = ({ index, isHideCounter, color, bgColor, accentColor }) => {
  const {
    selectedTab,
    contentOrientation,
    subTitle,
    title,
    description,
    image,
    ctaButton,
  } = useSlides().find((_, i) => i === index)!;

  const lastIndex = useLastIndex();

  //   const {primaryFont, secondaryFont, fontSize, fontTextAlignment} = useContentText();
  const { fontSize, fontTextAlignment } = useContentText();

  return (
    <div
      className="h-full pb-[8em] flex gap-[2em] z-[999]"
      style={{ flexDirection: contentOrientation }}
    >
      {selectedTab !== "image" && (
        <div
          className="text-[0.8em] flex-1 flex flex-col flex-wrap justify-center gap-[1.25em] text-left relative transition-all duration-300 z-[999]"
          style={{
            fontSize: `${fontSize}em`,
            textAlign: fontTextAlignment,
            alignItems:
              fontTextAlignment === "left"
                ? "flex-start"
                : fontTextAlignment === "right"
                ? "flex-end"
                : "center",
          }}
        >
          {!isHideCounter && 0 < index && index < lastIndex && (
            <div
              className="w-[2em] h-[2em] p-[3em] flex justify-center items-center rounded-[99em] z-[999]"
              style={{
                backgroundColor: accentColor,
                color: getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
              }}
            >
              <div className="text-[2.5em] font-semibold">{index}</div>
            </div>
          )}

          {subTitle.isEnabled && (
            <div
              className="text-[2.25em] leading-[1.1] mb-[0.195rem]"
              style={{ color: accentColor }}
            >
              {subTitle.text}
            </div>
          )}

          {title.isEnabled && (
            <div
              className="mb-[0.196296rem] break-words font-semibold whitespace-pre-wrap leading-[1.3]"
              style={{ color, fontSize: `${title.fontSize * 0.05625}em` }}
              dangerouslySetInnerHTML={{
                __html: title.text.replace(
                  /<c>/g,
                  `<c style="color:${accentColor};">`
                ),
              }}
            ></div>
          )}

          {description.isEnabled && (
            <div
              className="m-0 leading-tight opacity-90"
              style={{ color, fontSize: `${description.fontSize * 0.03625}em` }}
            >
              <p>{description.text}</p>
            </div>
          )}

          {ctaButton.isEnabled && (
            <div className="text-[2.5em] w-fit h-auto flex items-center justify-center text-left mt-[1em] z-[999]">
              <div
                className="px-[1.5em] py-[0.5em] rounded-[99em]"
                style={{
                  backgroundColor: accentColor,
                  color:
                    getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
                }}
              >
                {ctaButton.text}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTab !== "text" && image.isEnabled && (
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            borderColor: bgColor,
          }}
        >
          <div
            className="w-full h-full bg-no-repeat rounded-[1em] overflow-hidden z-[999]"
            style={{
              backgroundImage: `url(${image.src})`,
              opacity: image.opacity / 100,
              backgroundPosition: image.backgroundPosition,
              backgroundSize: image.backgroundSize,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SlideContent;
