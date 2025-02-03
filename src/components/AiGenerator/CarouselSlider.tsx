import React, { FC, useEffect } from "react";
import {
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Label,
} from "../ui";
import Slide from "./Slide/Slide";
import { useCarouselsState, useLastIndex } from "@/hooks";
import { useDispatch } from "react-redux";
import { setCurrentIndex, zoomIn, zoomOut } from "@/store";
import { Minus, Plus } from "lucide-react";

const CarouselSlider: FC = () => {
  const dispatch = useDispatch();

  const [api, setApi] = React.useState<CarouselApi>();

  const {
    currentIndex,
    slides: slidesData,
    zoomValue,
    settings: { isHideIntroSlide, isHideOutroSlide },
  } = useCarouselsState();
  const lastIndex = useLastIndex();

  const slides = Array.from(slidesData);

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
  }, [api, currentIndex, lastIndex, isHideIntroSlide, isHideOutroSlide]);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] mx-4 py-6 lg:mx-8 flex flex-col items-center justify-start gap-y-3"
      style={{ fontSize: `${zoomValue}%` }}
    >
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <div className="overflow-hidden w-full flex items-center justify-center">
          <CarouselContent className="w-[68em]">
            {slides.map((slide, index) => (
              <CarouselItem key={`slide_${index}`}>
                <Slide slide={slide} index={index} />
              </CarouselItem>
            ))}
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
              className={`py-0 px-0 h-6 w-6 cursor-pointer`}
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
            <Minus />
          </Button>

          <Label asSpan className="p-1">
            {zoomValue}%
          </Label>

          <Button
            onClick={() => dispatch(zoomIn())}
            size="sm"
            className="h-7 w-7"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;
