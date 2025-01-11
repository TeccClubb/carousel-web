import { SliderState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SliderState = {
  currentIndex: 0,
  zoomValue: 39,
  fontFamily: "DM Sans",
  brand: {
    name: "John Doe",
    handle: "@carouselmakerco",
    profileImage: "/john.jpg",
  },
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
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },

    setNextIndex: (state, action: PayloadAction<number>) => {
      const totalIndexes = action.payload;
      state.currentIndex = (state.currentIndex + 1) % totalIndexes;
    },

    setPrevIndex: (state, action: PayloadAction<number>) => {
      const totalIndexes = action.payload;
      state.currentIndex = (state.currentIndex - 1 + totalIndexes) % totalIndexes;
    },

    setZoomValue: (state, action: PayloadAction<number>) => {
      state.zoomValue = action.payload;
    },

    zoomOut: (state) => {
      state.zoomValue -= 3;
    },

    zoomIn: (state) => {
      state.zoomValue += 3;
    },
  },
});

export const {
  setCurrentIndex,
  setNextIndex,
  setPrevIndex,
  setZoomValue,
  zoomIn,
  zoomOut,
} = sliderSlice.actions;

export default sliderSlice.reducer;
