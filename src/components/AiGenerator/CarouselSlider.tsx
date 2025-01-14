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
import { useCarouselsState } from "@/hooks";
import { useDispatch } from "react-redux";
import { setCurrentIndex, zoomIn, zoomOut } from "@/store";
import { MinusIcon, PlusIcon } from "@/icons";

const CarouselSlider: FC = () => {
  const dispatch = useDispatch();

  const [api, setApi] = React.useState<CarouselApi>();

  const { currentIndex, slides, zoomValue } = useCarouselsState();

  const handleCurrentIndex = useCallback(() => {
    api?.on("select", () => {
      dispatch(setCurrentIndex(api.selectedScrollSnap()));
    });
  }, [api, dispatch]);

  useEffect(() => {
    handleCurrentIndex();
  }, [api, handleCurrentIndex]);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] mx-4 py-6 lg:mx-8 flex flex-col items-center justify-start gap-y-3"
      style={{ fontSize: `${zoomValue}%` }}
    >
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <div className="overflow-hidden w-full flex items-center justify-center">
          <CarouselContent className="w-[68em]">
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <Slide
                  key={slide.title?.text}
                  index={index}
                  slideClass={slide.slideClass}
                  isSlideNumber={slide.isSlideNumber}
                  subTitle={slide.subTitle}
                  title={slide.title}
                  description={slide.description}
                  ctaButton={slide.ctaButton}
                  image={slide.image}
                />
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
              className={`py-0 px-0 h-6 w-6 cursor-pointer ${
                currentIndex !== index
                  ? "border border-input text-primary bg-background hover:bg-accent hover:text-accent-foreground"
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
