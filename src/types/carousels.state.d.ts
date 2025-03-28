import { ImageBackgroundPosition } from "@/assets/imageBackgroundPositions";

export type NavPanel =
  | "ai"
  | "content"
  | "text"
  | "colors"
  | "background"
  | "branding"
  | "swipe"
  | "order"
  | "settings"
  | "randomize"
  | "my_carousels";

export type AiGeneratedData = {
  subTitle: string;
  title: string;
  description: string;
  cta_text?: string;
};

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
  backgroundImage: {
    src: string;
    isEnabled: boolean;
    opacity?: number;
    backgroundPosition?: ImageBackgroundPosition;
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

export type CarouselData = {
  slideRatio: { ratioId: string; width: number; height: number };
  slides: SlideContent[];
  contentText: ContentText;
  colors: Colors;
  brand: Brand;
  backgroundOverlay: BackgroundOverlay;
  settings: Settings;
  arrowText: ArrowText;
};

export type Carousel = {
  carouselId: number | null;
  title: string;
  imageSrc: string;
  data: CarouselData;
};

export type CarouselsState = {
  isOnceCarouselsFetched: boolean;
  activeNavPanel: NavPanel;
  signUpFirstDialogIsOpen: boolean;
  upgradeProDialogIsOpen: boolean;
  aiPanelSelectedTab: "topic" | "text" | "url";
  carousel: Carousel;
  carousels: Carousel[];
  currentIndex: number;
  newSlide: SlideContent;
};
