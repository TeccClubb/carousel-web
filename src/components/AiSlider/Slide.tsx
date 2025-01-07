import React, { FC } from "react";
import "@/css/slide.css";
import { SlideType } from "@/types";
import { useSliderFontFamily } from "@/hooks";
import { useSliderActiveIndex, useSliderBrand } from "@/hooks";
import Watermark from "./Watermark";
import Image from "next/image";

const Slide: FC<SlideType & { index: number }> = ({
  index,
  slideClass,
  isSlideNumber,
  subTitle,
  title,
  description,
  ctaButton,
  image,
}) => {
  const activeIndex = useSliderActiveIndex();

  const isActive = index === activeIndex;

  const fontFamily = useSliderFontFamily();

  const isOddSlide = (index + 1) % 2 !== 0;

  // const domainName = "TechClub";

  const brand = useSliderBrand();

  return (
    <div
      style={{ outline: "none" }}
      data-index={index}
      className={`slick-slide${
        isActive ? " slick-active slick-center slick-current" : ""
      }`}
      tabIndex={-1}
      aria-hidden={!isActive}
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
                className={`slide ${slideClass}`}
                style={{
                  fontFamily: fontFamily,
                  backgroundColor: isOddSlide
                    ? "#160910"
                    : "rgb(231, 216, 199)",
                }}
              >
                {/* Corner Circles */}
                {!isOddSlide ? (
                  <div
                    className="slide_background_design"
                    style={{ opacity: "0.2" }}
                  >
                    <div
                      className="left-circle-without-blur"
                      style={{
                        right: "0",
                        bottom: "0",
                        transform: "translate(50%, 40%)",
                      }}
                    ></div>
                    <div
                      className="right-circle-without-blur"
                      style={{ left: "0", transform: "translateX(-50%)" }}
                    ></div>
                  </div>
                ) : (
                  <div
                    className="slide_background_design"
                    style={{ opacity: "0.2" }}
                  >
                    <div
                      className="right-circle-without-blur"
                      style={{ right: "0", transform: "translateX(50%)" }}
                    ></div>
                    <div
                      className="left-circle-without-blur"
                      style={{
                        left: "0",
                        bottom: "0",
                        transform: "translate(-50%, 40%)",
                      }}
                    ></div>
                  </div>
                )}

                {/* Background Overlay */}
                <div
                  className="slide_background_overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='192' height='192' viewBox='0 0 192 192'><path fill='%23808080' fill-opacity='0.08' d='M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z' /></svg>")`,
                    backgroundSize: "37.4px",
                    backgroundRepeat: "repeat",
                  }}
                />
                {/* Background Overlay Fade */}
                <div
                  className="slide_background_overlay_fade"
                  style={{
                    backgroundImage: isOddSlide
                      ? "radial-gradient(circle, rgba(22, 9, 16, 0) 0%, rgba(22, 9, 16, 1) 100%)"
                      : "radial-gradient(circle, rgba(231, 216, 199, 0) 0%, rgba(231, 216, 199, 1) 100%)",
                  }}
                />
                {/* Slide Content */}
                <div
                  className="slide_content"
                  style={{ flexDirection: "column", paddingBottom: "8em" }}
                >
                  <div
                    className="text_content"
                    style={{
                      fontSize: "0.8em",
                      textAlign: "left",
                      alignItems: "start",
                    }}
                  >
                    {isSlideNumber && (
                      <div
                        className="slide-number-container"
                        style={{
                          backgroundColor: "rgb(239, 146, 45)",
                          color: "rgb(0, 0, 0)",
                        }}
                      >
                        <div className="number">{index}</div>
                      </div>
                    )}

                    {subTitle && subTitle.isEnabled && (
                      <div
                        className="sub-title"
                        style={{
                          marginBottom: "0.195rem",
                          color: "rgb(239, 146, 45)",
                        }}
                      >
                        {subTitle.text}
                      </div>
                    )}

                    {title && title.isEnabled && (
                      <div
                        className="title"
                        style={{
                          fontFamily: "DM Serif Display",
                          marginBottom: "0.196296rem",
                          color: isOddSlide
                            ? "rgb(231, 216, 199)"
                            : "rgb(22, 9, 16)",
                        }}
                        dangerouslySetInnerHTML={{ __html: title.text }}
                      ></div>
                    )}

                    {description && description.isEnabled && (
                      <div
                        className="description"
                        style={{
                          color: isOddSlide
                            ? "rgb(231, 216, 199)"
                            : "rgb(22, 9, 16)",
                        }}
                      >
                        <p>{description.text}</p>
                      </div>
                    )}

                    {ctaButton && ctaButton.isEnabled && (
                      <div className="slide_cta_btn">
                        <div
                          className="slide_cta_btn_text"
                          style={{
                            backgroundColor: "rgb(239, 146, 45)",
                            color: "rgb(0, 0, 0)",
                          }}
                        >
                          {ctaButton.text}
                        </div>
                      </div>
                    )}
                  </div>

                  {image && image.isEnabled && (
                    <div
                      className="image_content relative"
                      style={{
                        borderColor: isOddSlide ? "#e7d8c7" : "rgb(22, 9, 16)",
                      }}
                    >
                      <div
                        className="slide_image"
                        style={{
                          backgroundImage: `url(${image.src})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          opacity: "1",
                          overflow: "hidden",
                          borderRadius: "1em",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                {/* Watermark */}
                <Watermark />

                {/* Branding */}
                <div
                  className="slide_branding"
                  style={{
                    color: isOddSlide ? "#e7d8c7" : "rgb(22, 9, 16)",
                  }}
                >
                  <div className="flex items-center">
                    <span className="branding_profile relative flex shrink-0">
                      <Image
                        className="aspect-square h-full w-full object-cover rounded-full"
                        src={brand.profileImage}
                        alt="Image not founded"
                        width={120}
                        height={120}
                        sizes="100vw"
                        priority
                      />
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        zIndex: "1",
                        position: "relative",
                      }}
                    >
                      <div className="branding_name">{brand.name}</div>
                      <div className="branding_handle">{brand.handle}</div>
                    </div>
                  </div>
                </div>
                {/* END of Branding */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
