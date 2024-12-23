import React from "react";
import { LeftArrow, RightArrow } from "@/icons";
import "./slider.css";
import { useDispatch } from "react-redux";
import {
  setActiveIndex,
  setNextIndex,
  setPrevIndex,
  zoomIn,
  zoomOut,
} from "@/store";
import SlideContainer from "../Slide/Slide";
import {
  useSliderActiveIndex,
  useSliderSlides,
  useSliderZoomValue,
} from "@/hooks";

const Slider1: React.FC = () => {
  const dispatch = useDispatch();

  const slides = useSliderSlides();
  const activeIndex = useSliderActiveIndex();
  const zoomValue = useSliderZoomValue();

  const handleSetPrevIndex = () => {
    if (activeIndex !== 0) {
      dispatch(setPrevIndex(slides.length));
    }
  };

  const handleSetNextIndex = () => {
    if (activeIndex !== slides.length - 1) {
      dispatch(setNextIndex(slides.length));
    }
  };

  const handleActiveIndex = (index: number) => {
    dispatch(setActiveIndex(index));
  };

  return (
    <div
      className="h-screen w-full overflow-auto lg:border-l lg:border-r relative"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="h-full px-4 py-6 lg:px-8 carousel_canvas_container">
        <div>
          <div
            id="carouse_slider"
            className="transition-all"
            style={{ fontSize: "19%" }}
          >
            <div className="slick-slider slick-initialized">
              <div
                className={`slick-arrow slick-prev${
                  activeIndex === 0 ? " slick-disabled" : ""
                } rounded-full`}
                onClick={handleSetPrevIndex}
              >
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9">
                  <LeftArrow />
                </div>
              </div>
              <div className="slick-list" style={{ padding: "0px 50px" }}>
                <div
                  className="slick-track transition-transform duration-500 ease-in-out"
                  style={{
                    // width: "6408px",
                    width: `${slides.length * 100}%`,
                    opacity: "1",
                    transform: `translate3d(-${activeIndex * 100}%, 0px, 0px)`, //"translate3d(431.5px, 0px, 0px)",
                  }}
                >
                  {slides.map((slide, index) => (
                    <SlideContainer
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
                  ))}
                </div>
              </div>
              <div
                className={`slick-arrow slick-next ${
                  activeIndex === slides.length - 1 ? "slick-disabled" : ""
                } rounded-full`}
                onClick={handleSetNextIndex}
              >
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9">
                  <RightArrow />
                </div>
              </div>

              <div className="slick-dots">
                <ul style={{ margin: "0px" }}>
                  {slides.map((_, index) => (
                    <li key={index} onClick={() => handleActiveIndex(index)}>
                      <div
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
                          activeIndex === index
                            ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                            : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                        } h-6 w-6 text-xs transition-all dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white`}
                      >
                        {index + 1}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="flex justify-center items-center">
            <button
              onClick={() => dispatch(zoomOut())}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-7 w-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Zoom Out</span>
            </button>

            <div className="text-xs flex items-center">
              <div className="inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs px-1 py-1">
                {zoomValue}%
              </div>
            </div>

            <button
              onClick={() => dispatch(zoomIn())}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-7 w-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Zoom In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider1;
