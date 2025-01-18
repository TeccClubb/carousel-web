import React, { FC } from "react";
import { useContentText } from "@/hooks";
import { getBrightness } from "@/lib/utils";
import { SlideContent as SlideContentType } from "@/types";

const SlideContent: FC<{
  slide: SlideContentType;
  index: number;
  isHideCounter: boolean;
  color: string;
  bgColor: string;
  accentColor: string;
}> = ({ slide, index, isHideCounter, color, bgColor, accentColor }) => {
  const {
    type = "regular",
    selectedTab = "text_&_image",
    contentOrientation = "column",
    subTitle: { text: subTitle = "", isEnabled: isSubTitleEnabled = true },
    title: {
      text: title = "",
      isEnabled: isTitleEnabled = true,
      fontSize: titleFontSize = 100,
    },
    description: {
      text: description = "",
      isEnabled: isDescriptionEnabled = true,
      fontSize: descriptionFontSize = 100,
    },
    image: {
      src: imageSrc = "",
      isEnabled: isImageEnabled = true,
      opacity: imageOpacity = 100,
      backgroundPosition: imageBackgroundPosition = "center center",
      isBgCover: isImageBackgroundCover = true,
    },
    ctaButton: {
      text: ctaButtonText = "",
      isEnabled: isCtaButtonEnabled = true,
    },
  } = slide;

  //   const {primaryFont, secondaryFont, fontSize, fontTextAlignment} = useContentText();
  const { fontSize = 0.8, fontTextAlignment = "left" } = useContentText();

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
          {!isHideCounter && type === "regular" && (
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

          {isSubTitleEnabled && (
            <div
              className="text-[2.25em] leading-[1.1] mb-[0.195rem]"
              style={{ color: accentColor }}
            >
              {subTitle}
            </div>
          )}

          {isTitleEnabled && (
            <div
              className="mb-[0.196296rem] break-words font-semibold whitespace-pre-wrap leading-[1.3]"
              style={{ color, fontSize: `${titleFontSize * 0.05625}em` }}
              dangerouslySetInnerHTML={{
                __html: title.replace(
                  /<c>/g,
                  `<c style="color:${accentColor};">`
                ),
              }}
            ></div>
          )}

          {isDescriptionEnabled && (
            <div
              className="m-0 leading-tight opacity-90"
              style={{ color, fontSize: `${descriptionFontSize * 0.03625}em` }}
            >
              <p>{description}</p>
            </div>
          )}

          {type === "outro" && isCtaButtonEnabled && (
            <div className="text-[2.5em] w-fit h-auto flex items-center justify-center text-left mt-[1em] z-[999]">
              <div
                className="px-[1.5em] py-[0.5em] rounded-[99em]"
                style={{
                  backgroundColor: accentColor,
                  color:
                    getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
                }}
              >
                {ctaButtonText}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTab !== "text" && imageSrc !== "" && isImageEnabled && (
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            borderColor: bgColor,
          }}
        >
          <div
            className="w-full h-full bg-no-repeat rounded-[1em] overflow-hidden z-[999]"
            style={{
              backgroundImage: `url(${imageSrc})`,
              opacity: imageOpacity / 100,
              backgroundPosition: imageBackgroundPosition,
              backgroundSize: isImageBackgroundCover ? "cover" : "contain",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SlideContent;
