import React, { FC, useCallback, useEffect } from "react";
import {
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui";
import Slide from "./Slide/Slide";
import { useCarouselsState, useLastIndex } from "@/hooks";
import { useDispatch } from "react-redux";
import { setCurrentIndex, zoomIn, zoomOut } from "@/store";
import { MinusIcon, PlusIcon } from "@/icons";

const CarouselSlider: FC = () => {
  const dispatch = useDispatch();

  const [api, setApi] = React.useState<CarouselApi>();

  const {
    currentIndex,
    slides,
    zoomValue,
    settings: { isHideIntroSlide, isHideOutroSlide },
  } = useCarouselsState();
  const lastIndex = useLastIndex();

  const handleCurrentIndex = useCallback(() => {
    api?.on("select", () => {
      dispatch(setCurrentIndex(api.selectedScrollSnap()));
    });
  }, [api, dispatch]);

  useEffect(() => {
    handleCurrentIndex();
  }, [handleCurrentIndex]);

  const handleHideSlides = useCallback(() => {
    if (isHideIntroSlide && isHideOutroSlide) {
      if (currentIndex === lastIndex - 1) {
        api?.scrollPrev();
      }
    } else if (isHideIntroSlide || isHideOutroSlide) {
      if (currentIndex === lastIndex) {
        api?.scrollPrev();
      }
    }
  }, [api, currentIndex, lastIndex, isHideIntroSlide, isHideOutroSlide]);

  useEffect(() => {
    handleHideSlides();
  }, [handleHideSlides]);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] mx-4 py-6 lg:mx-8 flex flex-col items-center justify-start gap-y-3"
      style={{ fontSize: `${zoomValue}%` }}
    >
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <div className="overflow-hidden w-full flex items-center justify-center">
          <CarouselContent className="w-[68em]">
            {slides.map((slide, index) =>
              index === 0 ? (
                !isHideIntroSlide && (
                  <CarouselItem key={index}>
                    <Slide
                      key={slide.title?.text}
                      index={index}
                    />
                  </CarouselItem>
                )
              ) : index === lastIndex ? (
                !isHideOutroSlide && (
                  <CarouselItem key={index}>
                    <Slide
                      key={slide.title?.text}
                      index={index}
                    />
                  </CarouselItem>
                )
              ) : (
                <CarouselItem key={index}>
                  <Slide
                    key={slide.title?.text}
                    index={index}
                  />
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </div>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>

      <ul className="flex flex-wrap gap-x-2.5">
        {slides.map((_, index) => (
          <li
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="w-5 h-5"
          >
            <Button
              variant={currentIndex === index ? "default" : "outline"}
              className={`py-0 px-0 h-6 w-6 cursor-pointer ${
                isHideIntroSlide &&
                isHideOutroSlide &&
                (index === slides.length - 1 || index === slides.length - 2)
                  ? "hidden"
                  : isHideIntroSlide &&
                    !isHideOutroSlide &&
                    index === slides.length - 1
                  ? "hidden"
                  : !isHideIntroSlide &&
                    isHideOutroSlide &&
                    index === slides.length - 1
                  ? "hidden"
                  : ""
              }`}
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
          >
            <MinusIcon />
          </Button>

          <div className="text-xs flex items-center">
            <div className="inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs px-1 py-1">
              {zoomValue}%
            </div>
          </div>
          <Button
            onClick={() => dispatch(zoomIn())}
            size="sm"
            className="h-7 w-7"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;
