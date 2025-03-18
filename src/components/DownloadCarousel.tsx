/* eslint-disable @next/next/no-head-element */
"use client";
import React, { FC, memo } from "react";
import Slide from "./AiGenerator/Slide/Slide";
import { useSearchParams } from "next/navigation";
import { CarouselData, User } from "@/types";

const DownloadCarousel: FC = () => {
  const searchParams = useSearchParams();

  const decodedCarouselData = decodeURIComponent(searchParams.get("carousel")!);
  const decodedUser = decodeURIComponent(searchParams.get("user")!);

  const carouselData: CarouselData = JSON.parse(decodedCarouselData);
  const user: User = JSON.parse(decodedUser);

  const {
    contentText: { primaryFont, secondaryFont },
    slides: slidesData,
    settings: { isHideIntroSlide, isHideOutroSlide },
  } = carouselData;

  const slides = Array.from(slidesData);

  if (isHideIntroSlide) {
    const introSlideIndex = slides.findIndex((slide) => slide.type === "intro");
    slides.splice(introSlideIndex, 1);
  }

  if (isHideOutroSlide) {
    const outroSlideIndex = slides.findIndex((slide) => slide.type === "outro");
    slides.splice(outroSlideIndex, 1);
  }

  return (
    <html>
      <head>
        <link rel="stylesheet" href={primaryFont.href} />
        <link rel="stylesheet" href={secondaryFont.href} />
      </head>
      <body style={{ fontSize: "95%" }}>
        {slides.map((slide, index) => (
          <Slide
            key={`slide_${index}`}
            slide={slide}
            index={index}
            carouselData={carouselData}
            user={user}
            isClient
            isDownloadRequest
          />
        ))}
      </body>
    </html>
  );
};

export default memo(DownloadCarousel);
