import { GoogleUser } from "./google.user";

export type SlideContent = {
  type?: "intro" | "regular" | "outro";
  selectedTab?: string;
  contentOrientation?: "row" | "row-reverse" | "column" | "column-reverse";
  subTitle: { text: string; isEnabled: boolean };
  title: {
    text: string;
    isEnabled: boolean;
    fontSize?: number;
  };
  ctaButton: { text: string; isEnabled?: boolean };
  description: {
    text: string;
    isEnabled: boolean;
    fontSize?: number;
  };
  image: {
    src: string;
    isEnabled: boolean;
    opacity?: number;
    backgroundPosition?: string;
    isBgCover?: boolean;
  };
};

type ContentText = {
  isCustomFontsEnabled: boolean;
  primaryFont: { name: string; href: string };
  secondaryFont: { name: string; href: string };
  fontSize: number;
  fontTextAlignment: "center" | "left" | "right";
};

type ArrowText = {
  arrowId: string;
  isOnlyArrow: boolean;
  introSlideArrow: { text: string; isEnabled: boolean };
  regularSlideArrow: { text: string; isEnabled: boolean };
};

type BackgroundOverlay = {
  backgroundId: string;
  overlayColor: string;
  overlayOpacity?: number;
  isOverlayFadeCorner: boolean;
  cornerElementId: string;
  cornerElementOpacity?: number;
};

export type Colors = {
  isUseCustomColors: boolean;
  isAlternateSlideColors: boolean;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

type Brand = {
  isShowInIntroSlide: boolean;
  isShowInOutroSlide: boolean;
  isShowInRegularSlide: boolean;
  name: { text: string; isEnabled: boolean };
  handle: { text: string; isEnabled: boolean };
  profileImage: { src: string; isEnabled: boolean };
};

type Settings = {
  isShowWaterMark: boolean;
  isHideIntroSlide: boolean;
  isHideOutroSlide: boolean;
  isHideCounter: boolean;
};

export type CarouselsState = {
  isOnceAppLoaded: boolean;
  loginStatus: boolean;
  userData: GoogleUser | null;
  currentIndex: number;
  slideRatio: { id: string; width: number; height: number };
  zoomValue: number;
  newSlide: SlideContent;
  slides: SlideContent[];
  contentText: ContentText;
  colors: Colors;
  brand: Brand;
  backgroundOverlay: BackgroundOverlay;
  settings: Settings;
  arrowText: ArrowText;
};
