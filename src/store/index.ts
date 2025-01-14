import store from "./store";

export type { RootState, StoreDispatch } from "./store";

export {
  setCurrentIndex,
  setSlideRatio,
  zoomIn,
  zoomOut,
  setBackgroundColor,
  setTextColor,
  setAccentColor,
  setColors,
  toggleAlternateSlideColors,
  setBackgroundId,
  setOverlayColor,
  setOverlayOpacity,
  toggleOverlayFadeCorner,
  setCornerElementId,
  setCornerElementOpacity,
  toggleShowWaterMark,
  toggleHideIntroSlide,
  toggleHideOutroSlide,
  toggleHideCounter,
} from "./carousels.slice";

export default store;
