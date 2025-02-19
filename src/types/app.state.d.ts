import { Locale } from "./locale";

export type AppState = {
  locale: Locale;
  zoomValue: number;
  isLoading: boolean;
  loaderTitle: string;
  dashboardActiveItem: string;
};
