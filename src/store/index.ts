import store from "./store";

export type { RootState, StoreDispatch } from "./store";

export {
  setActiveIndex,
  setNextIndex,
  setPrevIndex,
  zoomIn,
  zoomOut,
} from "./slider.slice";

export { setActiveRatioId } from "./slide.slice";

export { setActiveItem } from "./nav.slice";

export default store;
