type BackgroundOverlay = {
  backgroundId: string;
  overlayColor: string;
  overlayOpacity: number;
  isOverlayFadeCorner: boolean;
  cornerElementId: string;
  cornerElementOpacity: number;
};

export type Colors = {
  isAlternateSlideColors: boolean;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

type Brand = {
  name: string;
  handle: string;
  profileImage: string;
};

type Settings = {
  isShowWaterMark: boolean;
  isHideIntroSlide: boolean;
  isHideOutroSlide: boolean;
  isHideCounter: boolean;
};

export type SlideType = {
  slideClass: "intro-slide" | "regular-slide" | "outro-slide";
  isSlideNumber?: boolean;
  subTitle?: { text: string; isEnabled: boolean };
  title?: { text: string; isEnabled: boolean };
  ctaButton?: { text: string; isEnabled: boolean };
  description?: { text: string; isEnabled: boolean };
  image?: { src: string; isEnabled: boolean };
};

export type CarouselsState = {
  currentIndex: number;
  slideWidth: number;
  slideHeight: number;
  zoomValue: number;
  fontFamily: string;
  slides: SlideType[];
  colors: Colors;
  brand: Brand;
  backgroundOverlay: BackgroundOverlay;
  settings: Settings;
};
