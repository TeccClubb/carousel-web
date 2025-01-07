export type RatioId =
  | "linkedIn1"
  | "linkedIn2"
  | "InstaFeed1"
  | "InstaFeed2"
  | "InstaStories"
  | "tikTok";

export type Ratio = {
  id: RatioId;
  name: string;
  width: number;
  height: number;
};

export type SlideState = {
  activeRatioId: RatioId;
  slideWidth: number;
  slideHeight: number;
  ratios: Ratio[];
};
