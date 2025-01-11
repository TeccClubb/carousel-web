import store from "./store";

export type { RootState, StoreDispatch } from "./store";

export {
  setCurrentIndex,
  setNextIndex,
  setPrevIndex,
  zoomIn,
  zoomOut,
} from "./slider.slice";

export { setActiveRatioId } from "./slide.slice";

export { setActiveItem, setBackgroundColor, setTextColor, setAccentColor, setColors } from "./nav.slice";

export default store;
