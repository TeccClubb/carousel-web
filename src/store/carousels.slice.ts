import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarouselsState, GoogleUser, SlideContent } from "@/types";

const initialState: CarouselsState = {
  userData: null,
  language: "en",
  currentIndex: 0,
  slideRatio: { id: "linkedIn1", width: 4, height: 5 },
  zoomValue: 39,
  fontFamily: "DM Sans",
  slides: [
    {
      type: "intro",
      subTitle: { text: "Empower Your Inner Journey" },
      title: { text: "Mental Health and <c>Self-Care</c>" },
      description: {
        text: "Nurturing Your Mind, Body, and Soul for Inner Peace",
      },
      ctaButton: { text: "" },
      image: { src: "" },
    },
    {
      subTitle: { text: "" },
      title: { text: "<c>Mindfulness</c> Meditation" },
      description: {
        text: "Incorporate mindfulness meditation into your daily routine to reduce stress, increase self-awareness, and cultivate inner peace.",
      },
      ctaButton: { text: "" },
      image: { src: "/slide2-image.jpg" },
    },
    {
      subTitle: { text: "" },
      title: { text: "Daily Affirmations" },
      description: {
        text: "Start each day with positive affirmations to boost self-confidence and promote a healthy mindset. Believe in yourself and your ability to overcome challenges.",
      },
      ctaButton: { text: "" },
      image: { src: "/slide3-image.jpg" },
    },
    {
      subTitle: { text: "" },
      title: { text: "Creative Expression" },
      description: {
        text: "Engage in creative activities like painting, writing, or crafting to express yourself and channel your emotions in a positive way. Creativity is a powerful tool for self-discovery and healing.",
      },
      ctaButton: { text: "" },
      image: { src: "/slide4-image.jpg" },
    },
    {
      subTitle: { text: "" },
      title: { text: "Self-Care Rituals" },
      description: {
        text: "Prioritize self-care by indulging in activities that nourish your body, mind, and soul. Whether it's a soothing bath, a leisurely walk, or a cozy night in, make time for self-love and relaxation.",
      },
      ctaButton: { text: "" },
      image: { src: "/slide5-image.jpg" },
    },
    {
      type: "outro",
      subTitle: { text: "Stay Connected" },
      title: {
        text: "Join us for daily inspiration and support on your journey to thrive!",
      },
      description: { text: "" },
      ctaButton: { text: "Follow for More Inspiration" },
      image: { src: "" },
    },
  ],

  contentText: {
    isCustomFontsEnabled: false,
    primaryFont: { value: "alegreya", label: "Alegreya" },
    secondaryFont: { value: "source Sans pro", label: "Source Sans Pro" },
    fontSize: 0.8,
    fontTextAlignment: "left",
  },

  colors: {
    isUseCustomColors: false,
    isAlternateSlideColors: true,
    backgroundColor: "#160910",
    textColor: "#e7d8c7",
    accentColor: "#ef922d",
  },

  brand: {
    isShowInIntroSlide: true,
    isShowInOutroSlide: true,
    isShowInRegularSlide: true,
    name: { text: "John Doe", isEnabled: true },
    handle: { text: "@carouselmakerco", isEnabled: true },
    profileImage: { src: "/john.jpg", isEnabled: true },
  },

  backgroundOverlay: {
    backgroundId: "background_1",
    overlayColor: "#FFFFFF",
    isOverlayFadeCorner: true,
    cornerElementId: "element_3",
  },

  settings: {
    isShowWaterMark: true,
    isHideIntroSlide: false,
    isHideOutroSlide: false,
    isHideCounter: false,
  },

  arrowText: {
    arrowId: "",
    isOnlyArrow: false,
    introSlideArrow: { text: "", isEnabled: true },
    regularSlideArrow: { text: "", isEnabled: false },
  },
};

const carouselsSlice = createSlice({
  initialState,
  name: "carousels",
  reducers: {
    setUserData: (state, action: PayloadAction<GoogleUser>) => {
      state.userData = action.payload;
    },

    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },

    setSlideRatio: (
      state,
      action: PayloadAction<{ id: string; width: number; height: number }>
    ) => {
      state.slideRatio.id = action.payload.id;
      state.slideRatio.width = action.payload.width;
      state.slideRatio.height = action.payload.height;
    },

    zoomIn: (state) => {
      state.zoomValue += 3;
    },

    zoomOut: (state) => {
      state.zoomValue -= 3;
    },

    addNewSlide: (
      state,
      action: PayloadAction<{ index: number; slide: SlideContent }>
    ) => {
      state.slides.splice(action.payload.index, 0, action.payload.slide);
    },

    removeSlide: (state, action: PayloadAction<number>) => {
      state.slides.splice(action.payload, 1);
    },

    reorderSlides: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number | undefined;
      }>
    ) => {
      if (action.payload.destinationIndex === undefined) return;
      const slides = state.slides;
      const [removed] = slides.splice(action.payload.sourceIndex, 1);
      slides.splice(action.payload.destinationIndex, 0, removed);
    },

    setContentSelectedTab: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.selectedTab = action.payload;
    },
    setContentOrientation: (
      state,
      action: PayloadAction<"row" | "row-reverse" | "column" | "column-reverse">
    ) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.contentOrientation = action.payload;
    },
    toggleSubTitle: (state) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.subTitle.isEnabled = !slide!.subTitle.isEnabled;
    },
    setSubTitle: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.subTitle.text = action.payload;
    },

    toggleTitle: (state) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.title.isEnabled = !slide!.title.isEnabled;
    },
    setTitleFontSize: (state, action: PayloadAction<number>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.title.fontSize = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.title.text = action.payload;
    },

    toggleDescription: (state) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.description.isEnabled = !slide!.description.isEnabled;
    },
    setDescriptionFontSize: (state, action: PayloadAction<number>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.description.fontSize = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.description.text = action.payload;
    },

    toggleCTAButton: (state) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.ctaButton.isEnabled = !slide!.ctaButton.isEnabled;
    },
    setCTAText: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.ctaButton.text = action.payload;
    },

    toggleImage: (state) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.image.isEnabled = !slide!.image.isEnabled;
    },
    setImageSrc: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.image.src = action.payload;
    },
    setImageOpacity: (state, action: PayloadAction<number>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.image.opacity = action.payload;
    },
    setImageBackgroundPosition: (state, action: PayloadAction<string>) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.image.backgroundPosition = action.payload;
    },
    toggleImageBackgroundCover: (state) => {
      const slide = state.slides.find(
        (_, index) => index === state.currentIndex
      );
      slide!.image.isBgCover = !slide!.image.isBgCover;
    },

    toggleCustomFontsEnabled: (state) => {
      state.contentText.isCustomFontsEnabled =
        !state.contentText.isCustomFontsEnabled;
    },
    setPrimaryFont: (
      state,
      action: PayloadAction<{ value: string; label: string }>
    ) => {
      state.contentText.primaryFont = action.payload;
    },
    setSecondaryFont: (
      state,
      action: PayloadAction<{ value: string; label: string }>
    ) => {
      state.contentText.secondaryFont = action.payload;
    },
    setFontPair: (
      state,
      action: PayloadAction<{
        primaryFont: { value: string; label: string };
        secondaryFont: { value: string; label: string };
      }>
    ) => {
      state.contentText.primaryFont = action.payload.primaryFont;
      state.contentText.secondaryFont = action.payload.secondaryFont;
    },
    setContentFontSize: (state, action: PayloadAction<number>) => {
      state.contentText.fontSize = action.payload;
    },
    setContentFontTextAlignment: (
      state,
      action: PayloadAction<"left" | "center" | "right">
    ) => {
      state.contentText.fontTextAlignment = action.payload;
    },

    toggleCustomColors: (state) => {
      state.colors.isUseCustomColors = !state.colors.isUseCustomColors;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.colors.backgroundColor = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.colors.textColor = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.colors.accentColor = action.payload;
    },
    setColors: (
      state,
      action: PayloadAction<{
        backgroundColor: string;
        textColor: string;
        accentColor: string;
      }>
    ) => {
      state.colors.backgroundColor = action.payload.backgroundColor;
      state.colors.textColor = action.payload.textColor;
      state.colors.accentColor = action.payload.accentColor;
    },
    toggleAlternateSlideColors: (state) => {
      state.colors.isAlternateSlideColors =
        !state.colors.isAlternateSlideColors;
    },

    setBackgroundId: (state, action: PayloadAction<string>) => {
      state.backgroundOverlay.backgroundId = action.payload;
    },

    toggleBrandShowInIntroSlide: (state) => {
      state.brand.isShowInIntroSlide = !state.brand.isShowInIntroSlide;
    },
    toggleBrandShowInOutroSlide: (state) => {
      state.brand.isShowInOutroSlide = !state.brand.isShowInOutroSlide;
    },
    toggleBrandShowInRegularSlide: (state) => {
      state.brand.isShowInRegularSlide = !state.brand.isShowInRegularSlide;
    },
    setBrandName: (state, action: PayloadAction<string>) => {
      state.brand.name.text = action.payload;
    },
    toggleBrandName: (state) => {
      state.brand.name.isEnabled = !state.brand.name.isEnabled;
    },
    setBrandHandle: (state, action: PayloadAction<string>) => {
      state.brand.handle.text = action.payload;
    },
    toggleBrandHandle: (state) => {
      state.brand.handle.isEnabled = !state.brand.handle.isEnabled;
    },
    setBrandProfileSrc: (state, action: PayloadAction<string>) => {
      state.brand.profileImage.src = action.payload;
    },
    toggleBrandProfile: (state) => {
      state.brand.profileImage.isEnabled = !state.brand.profileImage.isEnabled;
    },

    setOverlayColor: (state, action: PayloadAction<string>) => {
      state.backgroundOverlay.overlayColor = action.payload;
    },

    setOverlayOpacity: (state, action: PayloadAction<number>) => {
      state.backgroundOverlay.overlayOpacity = action.payload;
    },

    toggleOverlayFadeCorner: (state) => {
      state.backgroundOverlay.isOverlayFadeCorner =
        !state.backgroundOverlay.isOverlayFadeCorner;
    },

    setCornerElementId: (state, action: PayloadAction<string>) => {
      state.backgroundOverlay.cornerElementId = action.payload;
    },

    setCornerElementOpacity: (state, action: PayloadAction<number>) => {
      state.backgroundOverlay.cornerElementOpacity = action.payload;
    },

    toggleShowWaterMark: (state) => {
      state.settings.isShowWaterMark = !state.settings.isShowWaterMark;
    },

    toggleHideIntroSlide: (state) => {
      state.settings.isHideIntroSlide = !state.settings.isHideIntroSlide;
    },

    toggleHideOutroSlide: (state) => {
      state.settings.isHideOutroSlide = !state.settings.isHideOutroSlide;
    },

    toggleHideCounter: (state) => {
      state.settings.isHideCounter = !state.settings.isHideCounter;
    },

    setIntroSlideArrowText: (state, action: PayloadAction<string>) => {
      state.arrowText.introSlideArrow.text = action.payload;
    },
    toggleIntroSlideArrow: (state) => {
      state.arrowText.introSlideArrow.isEnabled =
        !state.arrowText.introSlideArrow.isEnabled;
    },

    setRegularSlideArrowText: (state, action: PayloadAction<string>) => {
      state.arrowText.regularSlideArrow.text = action.payload;
    },
    toggleRegularSlideArrow: (state) => {
      state.arrowText.regularSlideArrow.isEnabled =
        !state.arrowText.regularSlideArrow.isEnabled;
    },

    toggleArrowText: (state) => {
      state.arrowText.isOnlyArrow = !state.arrowText.isOnlyArrow;
    },

    setArrowId: (state, action: PayloadAction<string>) => {
      state.arrowText.arrowId = action.payload;
    },
  },
});

export const {
  setUserData,
  setLanguage,
  setCurrentIndex,
  setSlideRatio,
  zoomIn,
  zoomOut,
  addNewSlide,
  removeSlide,
  reorderSlides,
  setContentSelectedTab,
  setContentOrientation,
  setTitle,
  toggleSubTitle,
  setSubTitle,
  toggleTitle,
  setTitleFontSize,
  setDescription,
  setDescriptionFontSize,
  toggleDescription,
  setCTAText,
  toggleCTAButton,
  setImageSrc,
  toggleImage,
  setImageOpacity,
  setImageBackgroundPosition,
  toggleImageBackgroundCover,
  toggleCustomFontsEnabled,
  setPrimaryFont,
  setSecondaryFont,
  setFontPair,
  setContentFontSize,
  setContentFontTextAlignment,
  toggleCustomColors,
  setBackgroundColor,
  setTextColor,
  setAccentColor,
  setColors,
  toggleAlternateSlideColors,
  setBackgroundId,
  toggleBrandShowInIntroSlide,
  toggleBrandShowInOutroSlide,
  toggleBrandShowInRegularSlide,
  setBrandName,
  toggleBrandName,
  setBrandHandle,
  toggleBrandHandle,
  setBrandProfileSrc,
  toggleBrandProfile,
  setOverlayColor,
  setOverlayOpacity,
  toggleOverlayFadeCorner,
  setCornerElementId,
  setCornerElementOpacity,
  toggleShowWaterMark,
  toggleHideIntroSlide,
  toggleHideOutroSlide,
  toggleHideCounter,
  setIntroSlideArrowText,
  toggleIntroSlideArrow,
  setRegularSlideArrowText,
  toggleRegularSlideArrow,
  toggleArrowText,
  setArrowId,
} = carouselsSlice.actions;

export default carouselsSlice.reducer;
