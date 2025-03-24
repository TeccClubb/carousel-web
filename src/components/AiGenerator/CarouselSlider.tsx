import React, { FC, memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Label } from "../ui/label";
import Slide from "./Slide/Slide";
import { useAppState } from "@/hooks/use-app-state";
import { useDispatch } from "react-redux";
import { zoomIn, zoomOut } from "@/store/app.slice";
import {
  setActiveNavPanelAndIndex,
  setCurrentIndex,
} from "@/store/carousels.slice";
import { Minus, Plus } from "lucide-react";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useUserCookie } from "@/hooks/use-cookie";

const CarouselSlider: FC = () => {
  const dispatch = useDispatch();

  const [api, setApi] = useState<CarouselApi>();

  const { zoomValue } = useAppState();

  const { isAppMounted } = useAppState();
  const { user } = useUserCookie();

  const {
    currentIndex,
    carousel: { data: carouselData },
  } = useCarouselsState();

  const {
    slides: slidesData,
    settings: { isHideIntroSlide, isHideOutroSlide },
  } = carouselData;

  const slides = Array.from(slidesData);
  const lastIndex = slides.length - 1;

  if (isHideIntroSlide) {
    const introSlideIndex = slides.findIndex((slide) => slide.type === "intro");
    slides.splice(introSlideIndex, 1);
  }

  if (isHideOutroSlide) {
    const outroSlideIndex = slides.findIndex((slide) => slide.type === "outro");
    slides.splice(outroSlideIndex, 1);
  }

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      dispatch(setCurrentIndex(api.selectedScrollSnap()));
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, dispatch]);

  useEffect(() => {
    if (
      (isHideIntroSlide &&
        isHideOutroSlide &&
        currentIndex === lastIndex - 1) ||
      ((isHideIntroSlide || isHideOutroSlide) && currentIndex === lastIndex)
    ) {
      api?.scrollPrev();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, isHideIntroSlide, isHideOutroSlide]);

  useEffect(() => {
    api?.scrollTo(currentIndex);
  }, [api, currentIndex]);

  return (
    <div
      id="carousel-slider"
      className="min-h-[calc(100vh-4rem)] mx-4 py-6 lg:mx-8 flex flex-col items-center justify-start gap-y-3"
      style={{ fontSize: `${zoomValue}%` }}
    >
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <div className="overflow-hidden w-full flex items-center justify-center">
          <CarouselContent className="w-[68em]">
            {slides.map((slide, index) => (
              <CarouselItem key={`slide_${index}`}>
                <Slide
                  slide={slide}
                  index={index}
                  carouselData={carouselData}
                  user={user}
                  isAppMounted={isAppMounted}
                  onClick={() =>
                    dispatch(
                      setActiveNavPanelAndIndex({ index, navPanel: "content" })
                    )
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>

      <ul className="flex flex-wrap gap-2.5">
        {slides.map((_, index) => (
          <li
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="w-5 h-5"
          >
            <Button
              variant={currentIndex === index ? "default" : "outline"}
              className={`p-0 h-6 w-6 cursor-pointer`}
            >
              {index + 1}
            </Button>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-6 left-6">
        <div className="flex justify-center items-center">
          <Button
            onClick={() => dispatch(zoomOut())}
            size="sm"
            className="h-7 w-7"
            disabled={zoomValue <= 20}
          >
            <Minus />
          </Button>

          <Label asSpan className="p-1">
            {zoomValue}%
          </Label>

          <Button
            onClick={() => dispatch(zoomIn())}
            size="sm"
            className="h-7 w-7"
            disabled={zoomValue >= 100}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(CarouselSlider);
