import { CarouselsState, Colors } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CarouselsState = {
  currentIndex: 0,
  slideWidth: 4,
  slideHeight: 5,
  zoomValue: 39,
  fontFamily: "DM Sans",
  slides: [
    {
      slideClass: "intro-slide",
      isSlideNumber: false,
      subTitle: { text: "Empower Your Inner Journey", isEnabled: true },
      title: {
        text: "Mental Health and <span>Self-Care</span>",
        isEnabled: true,
      },
      description: {
        text: "Nurturing Your Mind, Body, and Soul for Inner Peace",
        isEnabled: true,
      },
    },
    {
      slideClass: "regular-slide",
      isSlideNumber: true,
      title: { text: "<span>Mindfulness</span> Meditation", isEnabled: true },
      description: {
        text: "Incorporate mindfulness meditation into your daily routine to reduce stress, increase self-awareness, and cultivate inner peace.",
        isEnabled: true,
      },
      image: { src: "/slide2-image.jpg", isEnabled: true },
    },
    {
      slideClass: "regular-slide",
      isSlideNumber: true,
      title: { text: "Daily Affirmations", isEnabled: true },
      description: {
        text: "Start each day with positive affirmations to boost self-confidence and promote a healthy mindset. Believe in yourself and your ability to overcome challenges.",
        isEnabled: true,
      },
      image: { src: "/slide3-image.jpg", isEnabled: true },
    },
    {
      isSlideNumber: true,
      slideClass: "regular-slide",
      title: { text: "Creative Expression", isEnabled: true },
      description: {
        text: "Engage in creative activities like painting, writing, or crafting to express yourself and channel your emotions in a positive way. Creativity is a powerful tool for self-discovery and healing.",
        isEnabled: true,
      },
      image: { src: "/slide4-image.jpg", isEnabled: true },
    },
    {
      slideClass: "regular-slide",
      isSlideNumber: true,
      title: { text: "Self-Care Rituals", isEnabled: true },
      description: {
        text: "Prioritize self-care by indulging in activities that nourish your body, mind, and soul. Whether it's a soothing bath, a leisurely walk, or a cozy night in, make time for self-love and relaxation.",
        isEnabled: true,
      },
      image: { src: "/slide5-image.jpg", isEnabled: true },
    },
    {
      slideClass: "outro-slide",
      isSlideNumber: false,
      subTitle: { text: "Stay Connected", isEnabled: true },
      title: {
        text: "Join us for daily inspiration and support on your journey to thrive!",
        isEnabled: true,
      },
      ctaButton: { text: "Follow for More Inspiration", isEnabled: true },
    },
  ],

  colors: {
    isAlternateSlideColors: true,
    backgroundColor: "#160910",
    textColor: "#e7d8c7",
    accentColor: "#ef922d",
  },

  brand: {
    name: "John Doe",
    handle: "@carouselmakerco",
    profileImage: "/john.jpg",
  },

  backgroundOverlay: {
    backgroundId: "background_1",
    overlayColor: "#FFFFFF",
    overlayOpacity: 0.08,
    isOverlayFadeCorner: true,
    cornerElementId: "element_3",
    cornerElementOpacity: 0.2,
  },

  settings: {
    isShowWaterMark: true,
    isHideIntroSlide: false,
    isHideOutroSlide: false,
    isHideCounter: false,
  },
};

const carouselsSlice = createSlice({
  initialState,
  name: "carousels",
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },

    setSlideRatio: (
      state,
      action: PayloadAction<{ slideWidth: number; slideHeight: number }>
    ) => {
      state.slideWidth = action.payload.slideWidth;
      state.slideHeight = action.payload.slideHeight;
    },

    zoomIn: (state) => {
      state.zoomValue += 3;
    },

    zoomOut: (state) => {
      state.zoomValue -= 3;
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
      action: PayloadAction<Omit<Colors, "isAlternateSlideColors">>
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
  },
});

export const {
  setCurrentIndex,
  setSlideRatio,
  zoomIn,
  zoomOut,
  setBackgroundColor,
  setTextColor,
  setAccentColor,
  setColors,
  toggleAlternateSlideColors,
  setBackgroundId,
  setOverlayColor,
  setOverlayOpacity,
  toggleOverlayFadeCorner,
  setCornerElementId,
  setCornerElementOpacity,
  toggleShowWaterMark,
  toggleHideIntroSlide,
  toggleHideOutroSlide,
  toggleHideCounter,
} = carouselsSlice.actions;

export default carouselsSlice.reducer;
