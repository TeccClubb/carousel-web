"use client";
import React, { FC, memo, ReactNode } from "react";
import { Button } from "../ui";
import { ChevronRightIcon, DownloadIcon } from "lucide-react";
import { SlideContent as SlideContentType } from "@/types";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import {
  Document,
  Image,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { getBrightness } from "@/lib/utils";
import { getArrow } from "@/icons/arrows";
import ReactDOMServer from "react-dom/server";
import { useUserState } from "@/hooks/use-user-state";
import { useTranslations } from "next-intl";

const DownloadButton: FC = () => {
  const t = useTranslations();
  const domainName = "CarouselBuilder.io";
  const convertSvgToBase64 = (SvgComponent: ReactNode): string => {
    const svgString = ReactDOMServer.renderToStaticMarkup(SvgComponent);
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  const { userData } = useUserState();

  const {
    carousel: {
      data: {
        slides,
        colors: {
          isAlternateSlideColors,
          backgroundColor,
          textColor,
          accentColor,
        },
        brand: {
          isShowInIntroSlide,
          isShowInOutroSlide,
          isShowInRegularSlide,
          name,
          handle,
          profileImage,
        },
        settings: { isShowWaterMark, isHideCounter },
        arrowText: { arrowId, isOnlyArrow, introSlideArrow, regularSlideArrow },
        slideRatio: { width, height },
        contentText: {
          //   primaryFont: { name: primaryFont },
          //   secondaryFont: { name: secondaryFont },
          fontSize = 0.8,
          fontTextAlignment = "left",
        },
      },
    },
  } = useCarouselsState();

  const baseFontSize = 16;

  const pageWidth = 800;
  const pageHeight = (height / width) * 800;

  const PDFSlide: FC<{ slide: SlideContentType; index: number }> = ({
    slide,
    index,
  }) => {
    const {
      type = "regular",
      selectedTab = "text_&_image",
      contentOrientation = "column",
      subTitle: { text: subTitle = "", isEnabled: isSubTitleEnabled },
      title: {
        text: title = "",
        isEnabled: isTitleEnabled,
        fontSize: titleFontSize = 100,
      },
      description: {
        text: description = "",
        isEnabled: isDescriptionEnabled,
        fontSize: descriptionFontSize = 100,
      },
      image: {
        src: imageSrc = "",
        isEnabled: isImageEnabled,
        opacity: imageOpacity = 100,
        backgroundPosition: imageBackgroundPosition = "center center",
        isBgCover: isImageBackgroundCover = true,
      },
      ctaButton: {
        text: ctaButtonText = "",
        isEnabled: isCtaButtonEnabled = true,
      },
    } = slide;

    const isIntroSlide = type === "intro";
    const isOutroSlide = type === "outro";

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

    const arrowText = isIntroSlide
      ? introSlideArrow.text
      : regularSlideArrow.text;

    const brandName =
      userData === null ? "John Doe" : name.text || userData.name;
    const brandHandle =
      userData === null
        ? "https://carouselbuilder.io"
        : handle.text || userData.email;
    const brandImageSrc =
      userData === null ? "/john.jpg" : profileImage.src || userData.avatar;

    const getPositionStyle = (position: string) => {
      switch (position) {
        case "left top":
          return { top: 0, left: 0 };
        case "center top":
          return { top: 0, left: "50%", transform: "translateX(-50%)" };
        case "right top":
          return { top: 0, right: 0 };
        case "left center":
          return { top: "50%", left: 0, transform: "translateY(-50%)" };
        case "center center":
          return {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          };
        case "right center":
          return { top: "50%", right: 0, transform: "translateY(-50%)" };
        case "left bottom":
          return { bottom: 0, left: 0 };
        case "center bottom":
          return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
        case "right bottom":
          return { bottom: 0, right: 0 };
        default:
          return { top: 0, left: 0 }; // Default to top-left
      }
    };

    const styles = StyleSheet.create({
      page: { marginLeft: "2px", marginRight: "2px" },
      slide: { width: "100%", height: "100%" },
      wrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        paddingBottom: `${(height / width) * 100}%`,
      },
      innerWrapper: {
        backgroundColor: "#A0B7D7",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      container: {
        width: "100%",
        height: "100%",
        padding: `${3.75 * baseFontSize}px`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        // fontFamily: `${secondaryFont}, sans-serif`,
        backgroundColor: bgColor,
      },

      //   overlayElement: {
      //     width: "100%",
      //     height: "100%",
      //     position: "absolute",
      //     left: 0,
      //     top: 0,
      //     overflow: "hidden",
      //     zIndex: 4,
      //     opacity: cornerElementOpacity / 100,
      //   },
      //   leftElement: {
      //     width: `${25 * baseFontSize}px`,
      //     height: `${25 * baseFontSize}px`,
      //     borderRadius: "50%",
      //     backgroundColor: accentColor,
      //     background,
      //     transform: isOddSlide ? "translate(-50%, 40%)" : "translate(50%, 40%)",
      //     position: "absolute",
      //     bottom: 0,
      //     left: isOddSlide ? 0 : undefined,
      //     right: isOddSlide ? undefined : 0,
      //   },
      //   rightElement: {
      //     width: `${25 * baseFontSize}px`,
      //     height: `${25 * baseFontSize}px`,
      //     borderRadius: "50%",
      //     backgroundColor: accentColor,
      //     background,
      //     transform: isOddSlide ? "translateX(50%)" : "translateX(-50%)",
      //     position: "absolute",
      //     top: "-14%",
      //     right: isOddSlide ? 0 : undefined,
      //     left: isOddSlide ? undefined : 0,
      //   },
      //   backgroundPattern: {
      //     width: "100%",
      //     height: "100%",
      //     position: "absolute",
      //     left: 0,
      //     top: 0,
      //     zIndex: 2,
      //     ...(backgroundPattern({
      //       backgroundId,
      //       fillColor:
      //         getBrightness(bgColor) > 200
      //           ? "#000000"
      //           : getBrightness(bgColor) < 80
      //           ? "#FFFFFF"
      //           : "#808080",
      //       opacity: overlayOpacity / 100,
      //     }) as Style),
      //   },
      //   overlayFadeCorner: {
      //     width: "100%",
      //     height: "100%",
      //     position: "absolute",
      //     left: 0,
      //     top: 0,
      //     zIndex: 3,
      //     backgroundColor: `radial-gradient(circle, ${bgColor}00 0%, ${bgColor} 100%)`,
      //   },
      //   leftArrowElement: {
      //     width: "50%",
      //     height: "50%",
      //     position: "absolute",
      //     bottom: 0,
      //     left: isOddSlide ? 0 : undefined,
      //     right: isOddSlide ? undefined : 0,
      //     transform: isOddSlide
      //       ? "translate(-25%, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);"
      //       : "translate(75%, 0px) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);",
      //     fontSize: `${20 * baseFontSize}px`,
      //     textAlign: "left",
      //     lineHeight: 1.9,
      //     fontWeight: 700,
      //     fontFamily: "inter",
      //     color: accentColor,
      //   },
      //   rightArrowElement: {
      //     width: "50%",
      //     height: "50%",
      //     position: "absolute",
      //     top: 0,
      //     right: isOddSlide ? 0 : undefined,
      //     left: isOddSlide ? undefined : 0,
      //     transform: isOddSlide
      //       ? "translate(50%, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);"
      //       : "translate(-50%, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);",
      //     fontSize: `${20 * baseFontSize}px`,
      //     textAlign: "right",
      //     lineHeight: 0.8,
      //     fontWeight: 700,
      //     fontFamily: "inter",
      //     color: accentColor,
      //   },

      slideContent: {
        height: "100%",
        paddingBottom: `${8 * baseFontSize}px`,
        display: "flex",
        gap: `${2 * baseFontSize}px`,
        zIndex: 999,
        flexDirection: contentOrientation,
      },
      textContent: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "0%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: `${1.25 * baseFontSize}px`,
        position: "relative",
        zIndex: 999,

        fontSize: `${fontSize * baseFontSize}px`,
        textAlign: fontTextAlignment,
        alignItems:
          fontTextAlignment === "left"
            ? "flex-start"
            : fontTextAlignment === "right"
            ? "flex-end"
            : "center",
      },
      slideNumber: {
        width: `${2 * baseFontSize}px`,
        height: `${2 * baseFontSize}px`,
        padding: `${3 * baseFontSize}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: `${99 * baseFontSize}px`,
        zIndex: 999,
        backgroundColor: accentColor,
        color: getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
      },
      slideNumberText: {
        fontSize: `${2.5 * baseFontSize}px`,
        fontWeight: 600,
      },
      slideSubTitle: {
        fontSize: `${2.25 * baseFontSize}px`,
        lineHeight: 1.1,
        marginBottom: `${0.195 * baseFontSize}px`,
        color: accentColor,
      },
      slideTitle: {
        marginBottom: `${0.196296 * baseFontSize}px`,
        overflowWrap: "break-word",
        fontWeight: 600,
        whiteSpace: "pre-wrap",
        lineHeight: 1.3,
        color,
        fontSize: `${titleFontSize * 0.05625}em`,
        // fontFamily: `${primaryFont}, sans-serif`,
      },
      slideDescription: {
        color,
        fontSize: `${descriptionFontSize * 0.03625 * baseFontSize}px`,
        margin: 0,
        lineHeight: 1.25,
        opacity: 0.9,
      },
      ctaTextView: {
        fontSize: `${2.5 * baseFontSize}px`,
        // width: "fit-content",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left",
        marginTop: `${1 * baseFontSize}px`,
        zIndex: 999,
      },
      ctaText: {
        paddingLeft: `${1.5 * baseFontSize}px`,
        paddingRight: `${1.5 * baseFontSize}px`,
        paddingTop: `${0.5 * baseFontSize}px`,
        paddingBottom: `${0.5 * baseFontSize}px`,
        borderRadius: `${99 * baseFontSize}px`,
        backgroundColor: accentColor,
        color: getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
      },
      slideImageView: {
        borderColor: bgColor,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "0%",
        overflow: "hidden",
        position: "relative",
      },
      slideImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
        zIndex: 999,
        opacity: imageOpacity / 100,
        objectFit: isImageBackgroundCover ? "cover" : "contain",
        borderRadius: `${1 * baseFontSize}px`,
        ...getPositionStyle(imageBackgroundPosition),
      },

      watermark: {
        width: "100%",
        height: `${2.25 * baseFontSize}px`,
        backgroundColor:
          getBrightness(backgroundColor) > 128 ? "#000000" : "#FFFFFF",
        color: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 999,
      },
      watermarkText: {
        fontSize: `${1.5 * baseFontSize}px`,
        fontWeight: 600,
        lineHeight: 1.1,
      },

      arrowTextView: {
        color: getBrightness(accentColor) > 128 ? "#000000" : "#FFFFFF",
        backgroundColor: accentColor,
        width: "auto",
        height: `${4 * baseFontSize}px`,
        paddingTop: `${3 * baseFontSize}px`,
        paddingBottom: `${3 * baseFontSize}px`,
        paddingLeft: `${1.5 * baseFontSize}px`,
        paddingRight: `${1.5 * baseFontSize}px`,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: `${1 * baseFontSize}px`,
        borderRadius: `${99 * baseFontSize}px`,
        position: "absolute",
        right: `${3.75 * baseFontSize}px`,
        bottom: `${3.75 * baseFontSize}px`,
        zIndex: 999,
      },
      arrowText: {
        fontSize: `${2 * baseFontSize}px`,
        paddingLeft: `${0.5 * baseFontSize}px`,
      },
      arrowTextIcon: {
        width: `${2 * baseFontSize}px`,
        height: `${2 * baseFontSize}px`,
      },
      arrow: {
        color: accentColor,
        position: "absolute",
        right: `${3.75 * baseFontSize}px`,
        bottom: `${3.75 * baseFontSize}px`,
        zIndex: 999,
      },

      brandView: {
        color,
        display: "flex",
        alignItems: "center",
        height: `${5.625 * baseFontSize}px`,
        position: "absolute",
        left: `${3.75 * baseFontSize}px`,
        bottom: `${3.75 * baseFontSize}px`,
        zIndex: 50,
      },
      brandInnerView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      brandImageView: {
        width: `${6 * baseFontSize}px`,
        height: `${6 * baseFontSize}px`,
        marginRight: `${1 * baseFontSize}px`,
        borderRadius: `${5 * baseFontSize}px`,
        flexShrink: 0,
      },
      brandImage: {
        width: `${2.25 * baseFontSize}px`,
        height: `${2.25 * baseFontSize}px`,
        borderRadius: 9999,
      },
      brandText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      },
      brandName: {
        fontSize: `${2 * baseFontSize}px`,
        fontWeight: 600,
        lineHeight: 1.1,
      },
      brandHandle: {
        fontSize: `${1.75 * baseFontSize}px`,
        fontWeight: 400,
        opacity: 0.9,
      },
    });

    return (
      <Page size={{ width: pageWidth, height: pageHeight }} style={styles.page}>
        <View style={styles.slide}>
          <View style={styles.wrapper}>
            <View style={styles.innerWrapper}>
              <View style={styles.container}>
                {/* <PDFSlideBgOverlay
                  baseFontSize={baseFontSize}
                  bgColor={bgColor}
                  isOddSlide={isOddSlide}
                /> */}

                {/* <PDFSlideContent
                  baseFontSize={baseFontSize}
                  slide={slide}
                  index={index}
                  isHideCounter={isHideCounter}
                  color={color}
                  bgColor={bgColor}
                  accentColor={accentColor}
                /> */}

                <View style={styles.slideContent}>
                  {selectedTab !== "image" && (
                    <View style={styles.textContent}>
                      {!isHideCounter && type === "regular" && (
                        <View style={styles.slideNumber}>
                          <Text style={styles.slideNumberText}>{index}</Text>
                        </View>
                      )}

                      {isSubTitleEnabled && (
                        <Text style={styles.slideSubTitle}>{subTitle}</Text>
                      )}

                      {isTitleEnabled && (
                        <View style={styles.slideTitle}>
                          {[...title.matchAll(/<c>(.*?)<\/c>|([^<]+)/g)].map(
                            (match, index) => (
                              <Text
                                key={`match_${index}`}
                                style={{
                                  color: match[1] ? accentColor : "inherit",
                                }}
                              >
                                {match[1] ? match[1] : match[2].trim()}&nbsp;
                              </Text>
                            )
                          )}
                        </View>
                      )}

                      {isDescriptionEnabled && (
                        <Text style={styles.slideDescription}>
                          {description}
                        </Text>
                      )}

                      {type === "outro" &&
                        isCtaButtonEnabled &&
                        ctaButtonText !== "" && (
                          <View style={styles.ctaTextView}>
                            <Text style={styles.ctaText}>{ctaButtonText}</Text>
                          </View>
                        )}
                    </View>
                  )}

                  {selectedTab !== "text" &&
                    imageSrc !== "" &&
                    isImageEnabled && (
                      <View style={styles.slideImageView}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image src={imageSrc} style={styles.slideImage} />
                      </View>
                    )}
                </View>

                {isShowWaterMark && (
                  //   <PDFSlideWatermark
                  //     baseFontSize={baseFontSize}
                  //     backgroundColor={backgroundColor}
                  //   />
                  <View style={styles.watermark}>
                    <Text style={styles.watermarkText}>
                      Created with {domainName}
                    </Text>
                  </View>
                )}

                {!isOutroSlide &&
                  ((isIntroSlide && introSlideArrow.isEnabled) ||
                  regularSlideArrow.isEnabled ? (
                    // <PDFSlideArrowText
                    //   baseFontSize={baseFontSize}
                    //   accentColor={accentColor}
                    //   arrowId={arrowId}
                    //   text={
                    //     isIntroSlide
                    //       ? introSlideArrow.text
                    //       : regularSlideArrow.text
                    //   }
                    //   isOnlyArrow={isOnlyArrow}
                    // />

                    !isOnlyArrow ? (
                      <View style={styles.arrowTextView}>
                        {arrowText && (
                          <Text style={styles.arrowText}>{arrowText}</Text>
                        )}
                        <View style={{ fontSize: `${1.5 * baseFontSize}px` }}>
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          <Image
                            src={convertSvgToBase64(<ChevronRightIcon />)}
                            style={styles.arrowTextIcon}
                          />
                        </View>
                      </View>
                    ) : (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image
                        src={convertSvgToBase64(getArrow(arrowId))}
                        style={styles.arrow}
                      />
                    )
                  ) : null)}

                {(isIntroSlide && isShowInIntroSlide) ||
                (isOutroSlide && isShowInOutroSlide) ||
                (isShowInRegularSlide && !isIntroSlide && !isOutroSlide) ? (
                  //    <PDFSlideBrand baseFontSize={baseFontSize} color={color} />
                  <View style={styles.brandView}>
                    <View style={styles.brandInnerView}>
                      {profileImage.isEnabled && (
                        <View style={styles.brandImageView}>
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          <Image
                            src={brandImageSrc}
                            style={styles.brandImage}
                          />
                        </View>
                      )}
                      <View style={styles.brandText}>
                        {name.isEnabled && (
                          <Text style={styles.brandName}>{brandName}</Text>
                        )}
                        {handle.isEnabled && (
                          <Text style={styles.brandHandle}>{brandHandle}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </Page>
    );
  };

  const PDFDocument: FC = () => (
    <Document>
      {slides.map((slide, index) => (
        <PDFSlide key={`slide_${index}`} slide={slide} index={index} />
      ))}
    </Document>
  );

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument />).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated.pdf";
    link.click();
  };
  return (
    <Button size="sm" onClick={handleDownload}>
      <DownloadIcon />
      <span className="hidden sm:inline">{t("download")}</span>
    </Button>
  );
};

export default memo(DownloadButton);
