import ConfigureStore from "./ConfigureStore";

export type { RootState } from "./store";

export { setActiveIndex, setNextIndex, setPrevIndex, zoomIn, zoomOut } from "./sliderSlice";

export default ConfigureStore;
