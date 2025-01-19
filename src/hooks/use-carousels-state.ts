import { RootState, setLanguage, setSlideRatio } from "@/store";
import { useSelector } from "react-redux";

export const useLanguage = () => ({
  language: useSelector((state: RootState) => state.carousels.language),
  setLanguage,
});

export const useCarouselsState = () =>
  useSelector((state: RootState) => state.carousels);

export const useCurrentIndex = () =>
  useSelector((state: RootState) => state.carousels.currentIndex);

export const useLastIndex = () =>
  useSelector((state: RootState) => state.carousels.slides.length - 1);

export const useSlideRatio = () => ({ratio: useSelector((state: RootState) => state.carousels.slideRatio), setSlideRatio});

export const useSlides = () =>
  useSelector((state: RootState) => state.carousels.slides);

export const useCurrentSlide = () =>
  useSelector(
    (state: RootState) =>
      state.carousels.slides.find(
        (_, index) => index === state.carousels.currentIndex
      )!
  );

export const useContentText = () =>
  useSelector((state: RootState) => state.carousels.contentText);

export const useColors = () =>
  useSelector((state: RootState) => state.carousels.colors);

export const useBrand = () =>
  useSelector((state: RootState) => state.carousels.brand);

export const useBackgroundOverlay = () =>
  useSelector((state: RootState) => state.carousels.backgroundOverlay);

export const useSettings = () =>
  useSelector((state: RootState) => state.carousels.settings);

export const useArrowText = () =>
  useSelector((state: RootState) => state.carousels.arrowText);
