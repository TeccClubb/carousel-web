import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useSliderState = () => {
  return useSelector((state: RootState) => state.slider);
};

export const useSliderSlides = () => {
  return useSelector((state: RootState) => state.slider.slides);
};

export const useSliderFontFamily = () => {
  return useSelector((state: RootState) => state.slider.fontFamily);
};

export const useSliderCurrentIndex = () => {
  return useSelector((state: RootState) => state.slider.currentIndex);
};

export const useSliderZoomValue = () => {
  return useSelector((state: RootState) => state.slider.zoomValue);
};

export const useSliderBrand = () => {
  return useSelector((state: RootState) => state.slider.brand);
};
