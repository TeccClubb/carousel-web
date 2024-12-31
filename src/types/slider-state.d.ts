export type SlideType = {
  slideClass: "intro-slide" | "regular-slide" | "outro-slide";
  isSlideNumber?: boolean;
  subTitle?: { text: string; isEnabled: boolean };
  title?: { text: string; isEnabled: boolean };
  ctaButton?: { text: string; isEnabled: boolean };
  description?: { text: string; isEnabled: boolean };
  image?: { src: string; isEnabled: boolean };
};

export type Brand = {
  name: string;
  handle: string;
  profileImage: string;
};

export type SliderState = {
  activeIndex: number;
  zoomValue: number;
  fontFamily: string;
  brand: Brand;
  slides: SlideType[];
};
