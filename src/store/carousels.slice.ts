import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Carousel, CarouselsState, NavPanel } from "@/types";
import { fontPairs } from "@/assets/fonts";
import { darkColors, lightColors } from "@/assets/slide-colors";
import { ImageBackgroundPosition } from "@/assets/imageBackgroundPositions";

export const defaultCarousel: Carousel = {
  carouselId: null,
  title: "",
  imageSrc: "",
  data: {
    slideRatio: { ratioId: "linkedIn1", width: 4, height: 5 },
    slides: [
      {
        type: "intro",
        subTitle: { text: "Empower Your Inner Journey", isEnabled: true },
        title: {
          text: "Mental Health and <c>Self-Care</c>",
          isEnabled: true,
        },
        description: {
          text: "Nurturing Your Mind, Body, and Soul for Inner Peace",
          isEnabled: true,
        },
        ctaButton: { text: "" },
        image: { src: "", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      },
      {
        subTitle: { text: "", isEnabled: true },
        title: { text: "<c>Mindfulness</c> Meditation", isEnabled: true },
        description: {
          text: "Incorporate mindfulness meditation into your daily routine to reduce stress, increase self-awareness, and cultivate inner peace.",
          isEnabled: true,
        },
        ctaButton: { text: "" },
        image: { src: "/slide2-image.jpg", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      },
      {
        subTitle: { text: "", isEnabled: true },
        title: { text: "Daily Affirmations", isEnabled: true },
        description: {
          text: "Start each day with positive affirmations to boost self-confidence and promote a healthy mindset. Believe in yourself and your ability to overcome challenges.",
          isEnabled: true,
        },
        ctaButton: { text: "" },
        image: { src: "/slide3-image.jpg", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      },
      {
        subTitle: { text: "", isEnabled: true },
        title: { text: "Creative Expression", isEnabled: true },
        description: {
          text: "Engage in creative activities like painting, writing, or crafting to express yourself and channel your emotions in a positive way. Creativity is a powerful tool for self-discovery and healing.",
          isEnabled: true,
        },
        ctaButton: { text: "" },
        image: { src: "/slide4-image.jpg", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      },
      {
        subTitle: { text: "", isEnabled: true },
        title: { text: "Self-Care Rituals", isEnabled: true },
        description: {
          text: "Prioritize self-care by indulging in activities that nourish your body, mind, and soul. Whether it's a soothing bath, a leisurely walk, or a cozy night in, make time for self-love and relaxation.",
          isEnabled: true,
        },
        ctaButton: { text: "" },
        image: { src: "/slide5-image.jpg", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      },
      {
        type: "outro",
        subTitle: { text: "Stay Connected", isEnabled: true },
        title: {
          text: "Join us for daily inspiration and support on your journey to thrive!",
          isEnabled: true,
        },
        description: { text: "", isEnabled: true },
        ctaButton: { text: "Follow for More Inspiration", isEnabled: true },
        image: { src: "", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      },
    ],

    contentText: {
      isCustomFontsEnabled: false,
      primaryFont: {
        name: "DM Serif Display",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&display=auto&subset=latin,latin-ext",
      },
      secondaryFont: {
        name: "DM Sans",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;200;300;400;500;600;700;800;900;1000&display=auto&subset=latin,latin-ext&axes=opsz",
      },
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
      name: { text: "", isEnabled: true },
      handle: { text: "", isEnabled: true },
      profileImage: { src: "", isEnabled: true },
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
  },
};

const initialState: CarouselsState = {
  isOnceCarouselsFetched: false,
  activeNavPanel: "ai",
  currentIndex: 0,
  aiPanel: {
    totalSlides: 6,
    selectedTab: "topic",
    topic: "",
    text: "",
    url: "",
  },
  carousels: [],
  carousel: defaultCarousel,
  newSlide: {
    subTitle: { text: "", isEnabled: true },
    title: { text: "", isEnabled: true },
    description: { text: "", isEnabled: true },
    ctaButton: { text: "" },
    image: { src: "", isEnabled: true },
    backgroundImage: { src: "", isEnabled: true },
  },
};

const carouselsSlice = createSlice({
  initialState,
  name: "carousels",
  reducers: {
    setOnceCarouselsFetched: (state) => {
      state.isOnceCarouselsFetched = true;
    },

    setActiveNavPanel: (state, action: PayloadAction<NavPanel>) => {
      state.activeNavPanel = action.payload;
    },

    setActiveNavPanelAndIndex: (
      state,
      action: PayloadAction<{ index: number; navPanel: NavPanel }>
    ) => {
      state.currentIndex = action.payload.index;
      state.activeNavPanel = action.payload.navPanel;
    },

    setAiTotalSlides: (state, action: PayloadAction<number>) => {
      state.aiPanel.totalSlides = action.payload;
    },
    setAiPanelSelectedTab: (state, action: PayloadAction<string>) => {
      state.aiPanel.selectedTab = action.payload;
    },
    setAiTopic: (state, action: PayloadAction<string>) => {
      state.aiPanel.topic = action.payload;
    },
    setAiText: (state, action: PayloadAction<string>) => {
      state.aiPanel.text = action.payload;
    },
    setAiURL: (state, action: PayloadAction<string>) => {
      state.aiPanel.url = action.payload;
    },

    setCarousels: (state, action: PayloadAction<Carousel[]>) => {
      state.isOnceCarouselsFetched = true;
      state.currentIndex = 0;
      state.newSlide.subTitle.text = "";
      state.newSlide.subTitle.isEnabled = true;
      state.newSlide.title.text = "";
      state.newSlide.title.isEnabled = true;
      state.newSlide.description.text = "";
      state.newSlide.description.isEnabled = true;
      state.newSlide.image.src = "";
      state.newSlide.image.isEnabled = true;

      if (action.payload.length > 0) {
        const lastCarousel = action.payload[action.payload.length - 1];
        state.carousel.carouselId = lastCarousel.carouselId;
        state.carousel.title = lastCarousel.title;
        state.carousel.imageSrc = lastCarousel.imageSrc;
        state.carousel.data = lastCarousel.data;
      }

      state.carousels.length = 0;
      state.carousels.push(...action.payload);
    },

    addNewCarousel: (state, action: PayloadAction<Carousel>) => {
      if (state.carousel.carouselId !== action.payload.carouselId) {
        state.currentIndex = 0;
        state.newSlide.subTitle.text = "";
        state.newSlide.subTitle.isEnabled = true;
        state.newSlide.title.text = "";
        state.newSlide.title.isEnabled = true;
        state.newSlide.description.text = "";
        state.newSlide.description.isEnabled = true;
        state.newSlide.image.src = "";
        state.newSlide.image.isEnabled = true;
      }

      state.carousel.carouselId = action.payload.carouselId;
      state.carousel.title = action.payload.title;
      state.carousel.imageSrc = action.payload.imageSrc;
      state.carousel.data = action.payload.data;

      state.carousels.push(action.payload);
    },

    updateCarousel: (state, action: PayloadAction<Carousel>) => {
      const index = state.carousels.findIndex(
        (carousel) => carousel.carouselId === action.payload.carouselId
      );
      state.carousels[index] = action.payload;
    },

    removeCarousel: (state, action: PayloadAction<number>) => {
      const index = state.carousels.findIndex(
        (carousel) => carousel.carouselId === action.payload
      );
      state.carousels.splice(index, 1);

      if (state.carousels.length > 0) {
        if (state.carousel.carouselId === action.payload) {
          const lastCarousel = state.carousels[index === 0 ? index : index - 1];
          state.carousel.carouselId = lastCarousel.carouselId;
          state.carousel.title = lastCarousel.title;
          state.carousel.imageSrc = lastCarousel.imageSrc;
          state.carousel.data = lastCarousel.data;
        }
      } else {
        state.carousel.carouselId = defaultCarousel.carouselId;
        state.carousel.title = defaultCarousel.title;
        state.carousel.imageSrc = defaultCarousel.imageSrc;
        state.carousel.data = defaultCarousel.data;
      }
    },

    setCarousel: (state, action: PayloadAction<Carousel>) => {
      if (state.carousel.carouselId !== action.payload.carouselId) {
        state.currentIndex = 0;
        state.newSlide.subTitle.text = "";
        state.newSlide.subTitle.isEnabled = true;
        state.newSlide.title.text = "";
        state.newSlide.title.isEnabled = true;
        state.newSlide.description.text = "";
        state.newSlide.description.isEnabled = true;
        state.newSlide.image.src = "";
        state.newSlide.image.isEnabled = true;
      }

      state.carousel.carouselId = action.payload.carouselId;
      state.carousel.title = action.payload.title;
      state.carousel.imageSrc = action.payload.imageSrc;
      state.carousel.data = action.payload.data;
    },

    setCarouselId: (state, action: PayloadAction<number>) => {
      state.carousel.carouselId = action.payload;
    },

    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },

    setTitle: (state, action: PayloadAction<string>) => {
      state.carousel.title = action.payload;
    },

    setImageSrc: (state, action: PayloadAction<string>) => {
      state.carousel.imageSrc = action.payload;
    },

    setSlideRatio: (
      state,
      action: PayloadAction<{ ratioId: string; width: number; height: number }>
    ) => {
      state.carousel.data.slideRatio.ratioId = action.payload.ratioId;
      state.carousel.data.slideRatio.width = action.payload.width;
      state.carousel.data.slideRatio.height = action.payload.height;
    },

    addNewSlide: (state, action: PayloadAction<number>) => {
      state.carousel.data.slides.splice(action.payload + 1, 0, state.newSlide);
    },

    resetNewSlide: (state) => {
      state.newSlide.subTitle.text = "";
      state.newSlide.subTitle.isEnabled = true;
      state.newSlide.title.text = "";
      state.newSlide.title.isEnabled = true;
      state.newSlide.description.text = "";
      state.newSlide.description.isEnabled = true;
      state.newSlide.image.src = "";
      state.newSlide.image.isEnabled = true;
    },

    removeSlide: (state, action: PayloadAction<number>) => {
      state.carousel.data.slides.splice(action.payload, 1);
    },

    reorderSlides: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number | undefined;
      }>
    ) => {
      if (action.payload.destinationIndex === undefined) return;
      const slides = state.carousel.data.slides;
      const [removed] = slides.splice(action.payload.sourceIndex, 1);
      slides.splice(action.payload.destinationIndex, 0, removed);
    },

    setSlides: (
      state,
      action: PayloadAction<
        { subTitle: string; title: string; description: string }[]
      >
    ) => {
      state.currentIndex = 0;
      state.newSlide.subTitle.text = "";
      state.newSlide.subTitle.isEnabled = true;
      state.newSlide.title.text = "";
      state.newSlide.title.isEnabled = true;
      state.newSlide.description.text = "";
      state.newSlide.description.isEnabled = true;
      state.newSlide.image.src = "";
      state.newSlide.image.isEnabled = true;

      state.carousel.data.slides = action.payload.map((slide, index) => ({
        type:
          index === 0
            ? "intro"
            : index === action.payload.length - 1
            ? "outro"
            : "regular",
        subTitle: {
          text: slide.subTitle,
          isEnabled: index === 0 || index === action.payload.length - 1,
        },
        title: { text: slide.title, isEnabled: true },
        description: { text: slide.description, isEnabled: true },
        ctaButton: {
          text:
            index === action.payload.length - 1
              ? "Follow for More Inspiration"
              : "",
          isEnabled: index === action.payload.length - 1,
        },
        image: { src: "", isEnabled: true },
        backgroundImage: { src: "", isEnabled: true },
      }));

      const randomFontPairIndex = Math.floor(Math.random() * fontPairs.length);
      const fontPair = fontPairs[randomFontPairIndex];

      const colorsGroup = [...darkColors, ...lightColors];
      const randomColorsIndex = Math.floor(Math.random() * colorsGroup.length);
      const colors = colorsGroup[randomColorsIndex];

      const randomIsAlternateColorsIndex = Math.floor(Math.random() * 2);

      const randomBackgroundIdIndex = Math.floor(Math.random() * 24);

      const randomCornerElementIndex = Math.floor(Math.random() * 4);

      state.carousel.data.contentText.primaryFont = fontPair.primaryFont;
      state.carousel.data.contentText.secondaryFont = fontPair.secondaryFont;
      state.carousel.data.colors.backgroundColor = colors.backgroundColor;
      state.carousel.data.colors.textColor = colors.textColor;
      state.carousel.data.colors.accentColor = colors.accentColor;
      state.carousel.data.colors.isAlternateSlideColors = [true, false][
        randomIsAlternateColorsIndex
      ];
      state.carousel.data.backgroundOverlay.backgroundId = `background_${randomBackgroundIdIndex}`;
      state.carousel.data.backgroundOverlay.cornerElementId = `element_${randomCornerElementIndex}`;
    },

    setContentSelectedTab: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].selectedTab =
        action.payload;
    },
    setContentOrientation: (
      state,
      action: PayloadAction<"row" | "row-reverse" | "column" | "column-reverse">
    ) => {
      state.carousel.data.slides[state.currentIndex].contentOrientation =
        action.payload;
    },

    toggleNewSlideSubTitle: (state) => {
      state.newSlide.subTitle.isEnabled = !state.newSlide.subTitle.isEnabled;
    },
    setNewSlideSubTitle: (state, action: PayloadAction<string>) => {
      state.newSlide.subTitle.text = action.payload;
    },
    toggleNewSlideTitle: (state) => {
      state.newSlide.title.isEnabled = !state.newSlide.title.isEnabled;
    },
    setNewSlideTitle: (state, action: PayloadAction<string>) => {
      state.newSlide.title.text = action.payload;
    },
    toggleNewSlideDescription: (state) => {
      state.newSlide.description.isEnabled =
        !state.newSlide.description.isEnabled;
    },
    setNewSlideDescription: (state, action: PayloadAction<string>) => {
      state.newSlide.description.text = action.payload;
    },
    toggleNewSlideImage: (state) => {
      state.newSlide.image.isEnabled = !state.newSlide.image.isEnabled;
    },
    setNewSlideImageSrc: (state, action: PayloadAction<string>) => {
      state.newSlide.image.src = action.payload;
    },

    toggleSlideSubTitle: (state) => {
      state.carousel.data.slides[state.currentIndex].subTitle.isEnabled =
        !state.carousel.data.slides[state.currentIndex].subTitle.isEnabled;
    },
    setSlideSubTitle: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].subTitle.text =
        action.payload;
    },

    toggleSlideTitle: (state) => {
      state.carousel.data.slides[state.currentIndex].title.isEnabled =
        !state.carousel.data.slides[state.currentIndex].title.isEnabled;
    },
    setSlideTitleFontSize: (state, action: PayloadAction<number>) => {
      state.carousel.data.slides[state.currentIndex].title.fontSize =
        action.payload;
    },
    setSlideTitle: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].title.text =
        action.payload;
    },

    toggleSlideDescription: (state) => {
      state.carousel.data.slides[state.currentIndex].description.isEnabled =
        !state.carousel.data.slides[state.currentIndex].description.isEnabled;
    },
    setSlideDescriptionFontSize: (state, action: PayloadAction<number>) => {
      state.carousel.data.slides[state.currentIndex].description.fontSize =
        action.payload;
    },
    setSlideDescription: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].description.text =
        action.payload;
    },

    toggleSlideCTAButton: (state) => {
      state.carousel.data.slides[state.currentIndex].ctaButton.isEnabled =
        !state.carousel.data.slides[state.currentIndex].ctaButton.isEnabled;
    },
    setSlideCTAText: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].ctaButton.text =
        action.payload;
    },

    toggleSlideImage: (state) => {
      state.carousel.data.slides[state.currentIndex].image.isEnabled =
        !state.carousel.data.slides[state.currentIndex].image.isEnabled;
    },
    setSlideImageSrc: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].image.src = action.payload;
    },
    setSlideImageOpacity: (state, action: PayloadAction<number>) => {
      state.carousel.data.slides[state.currentIndex].image.opacity =
        action.payload;
    },
    setSlideImageBackgroundPosition: (state, action: PayloadAction<string>) => {
      state.carousel.data.slides[state.currentIndex].image.backgroundPosition =
        action.payload;
    },
    toggleSlideImageBackgroundCover: (state) => {
      state.carousel.data.slides[state.currentIndex].image.isBgCover =
        !state.carousel.data.slides[state.currentIndex].image.isBgCover;
    },

    toggleSlideBackgroundImage: (state, action: PayloadAction<number>) => {
      state.carousel.data.slides[action.payload].backgroundImage.isEnabled =
        !state.carousel.data.slides[action.payload].backgroundImage.isEnabled;
    },
    setSlideBackgroundImageSrc: (
      state,
      action: PayloadAction<{ index: number; imageSrc: string }>
    ) => {
      state.carousel.data.slides[action.payload.index].backgroundImage.src =
        action.payload.imageSrc;
    },
    setSlideBackgroundImageOpacity: (
      state,
      action: PayloadAction<{ index: number; opacity: number }>
    ) => {
      state.carousel.data.slides[action.payload.index].backgroundImage.opacity =
        action.payload.opacity;
    },
    setSlideBackgroundImageBackgroundPosition: (
      state,
      action: PayloadAction<{
        index: number;
        backgroundPosition: ImageBackgroundPosition;
      }>
    ) => {
      state.carousel.data.slides[
        action.payload.index
      ].backgroundImage.backgroundPosition = action.payload.backgroundPosition;
    },

    toggleCustomFontsEnabled: (state) => {
      state.carousel.data.contentText.isCustomFontsEnabled =
        !state.carousel.data.contentText.isCustomFontsEnabled;
    },
    setPrimaryFont: (
      state,
      action: PayloadAction<{ name: string; href: string }>
    ) => {
      state.carousel.data.contentText.primaryFont = action.payload;
    },
    setSecondaryFont: (
      state,
      action: PayloadAction<{ name: string; href: string }>
    ) => {
      state.carousel.data.contentText.secondaryFont = action.payload;
    },
    setFontPair: (
      state,
      action: PayloadAction<{
        primaryFont: { name: string; href: string };
        secondaryFont: { name: string; href: string };
      }>
    ) => {
      state.carousel.data.contentText.primaryFont = action.payload.primaryFont;
      state.carousel.data.contentText.secondaryFont =
        action.payload.secondaryFont;
    },
    setContentFontSize: (state, action: PayloadAction<number>) => {
      state.carousel.data.contentText.fontSize = action.payload;
    },
    setContentFontTextAlignment: (
      state,
      action: PayloadAction<"left" | "center" | "right">
    ) => {
      state.carousel.data.contentText.fontTextAlignment = action.payload;
    },

    toggleCustomColors: (state) => {
      state.carousel.data.colors.isUseCustomColors =
        !state.carousel.data.colors.isUseCustomColors;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.carousel.data.colors.backgroundColor = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.carousel.data.colors.textColor = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.carousel.data.colors.accentColor = action.payload;
    },
    setColors: (
      state,
      action: PayloadAction<{
        backgroundColor: string;
        textColor: string;
        accentColor: string;
      }>
    ) => {
      state.carousel.data.colors.backgroundColor =
        action.payload.backgroundColor;
      state.carousel.data.colors.textColor = action.payload.textColor;
      state.carousel.data.colors.accentColor = action.payload.accentColor;
    },
    toggleAlternateSlideColors: (state) => {
      state.carousel.data.colors.isAlternateSlideColors =
        !state.carousel.data.colors.isAlternateSlideColors;
    },

    setBackgroundId: (state, action: PayloadAction<string>) => {
      state.carousel.data.backgroundOverlay.backgroundId = action.payload;
    },

    toggleBrandShowInIntroSlide: (state) => {
      state.carousel.data.brand.isShowInIntroSlide =
        !state.carousel.data.brand.isShowInIntroSlide;
    },
    toggleBrandShowInOutroSlide: (state) => {
      state.carousel.data.brand.isShowInOutroSlide =
        !state.carousel.data.brand.isShowInOutroSlide;
    },
    toggleBrandShowInRegularSlide: (state) => {
      state.carousel.data.brand.isShowInRegularSlide =
        !state.carousel.data.brand.isShowInRegularSlide;
    },
    setBrandName: (state, action: PayloadAction<string>) => {
      state.carousel.data.brand.name.text = action.payload;
    },
    toggleBrandName: (state) => {
      state.carousel.data.brand.name.isEnabled =
        !state.carousel.data.brand.name.isEnabled;
    },
    setBrandHandle: (state, action: PayloadAction<string>) => {
      state.carousel.data.brand.handle.text = action.payload;
    },
    toggleBrandHandle: (state) => {
      state.carousel.data.brand.handle.isEnabled =
        !state.carousel.data.brand.handle.isEnabled;
    },
    setBrandProfileSrc: (state, action: PayloadAction<string>) => {
      state.carousel.data.brand.profileImage.src = action.payload;
    },
    toggleBrandProfile: (state) => {
      state.carousel.data.brand.profileImage.isEnabled =
        !state.carousel.data.brand.profileImage.isEnabled;
    },

    setOverlayColor: (state, action: PayloadAction<string>) => {
      state.carousel.data.backgroundOverlay.overlayColor = action.payload;
    },

    setOverlayOpacity: (state, action: PayloadAction<number>) => {
      state.carousel.data.backgroundOverlay.overlayOpacity = action.payload;
    },

    toggleOverlayFadeCorner: (state) => {
      state.carousel.data.backgroundOverlay.isOverlayFadeCorner =
        !state.carousel.data.backgroundOverlay.isOverlayFadeCorner;
    },

    setCornerElementId: (state, action: PayloadAction<string>) => {
      state.carousel.data.backgroundOverlay.cornerElementId = action.payload;
    },

    setCornerElementOpacity: (state, action: PayloadAction<number>) => {
      state.carousel.data.backgroundOverlay.cornerElementOpacity =
        action.payload;
    },

    toggleShowWaterMark: (state) => {
      state.carousel.data.settings.isShowWaterMark =
        !state.carousel.data.settings.isShowWaterMark;
    },

    toggleHideIntroSlide: (state) => {
      state.carousel.data.settings.isHideIntroSlide =
        !state.carousel.data.settings.isHideIntroSlide;
    },

    toggleHideOutroSlide: (state) => {
      state.carousel.data.settings.isHideOutroSlide =
        !state.carousel.data.settings.isHideOutroSlide;
    },

    toggleHideCounter: (state) => {
      state.carousel.data.settings.isHideCounter =
        !state.carousel.data.settings.isHideCounter;
    },

    setIntroSlideArrowText: (state, action: PayloadAction<string>) => {
      state.carousel.data.arrowText.introSlideArrow.text = action.payload;
    },
    toggleIntroSlideArrow: (state) => {
      state.carousel.data.arrowText.introSlideArrow.isEnabled =
        !state.carousel.data.arrowText.introSlideArrow.isEnabled;
    },

    setRegularSlideArrowText: (state, action: PayloadAction<string>) => {
      state.carousel.data.arrowText.regularSlideArrow.text = action.payload;
    },
    toggleRegularSlideArrow: (state) => {
      state.carousel.data.arrowText.regularSlideArrow.isEnabled =
        !state.carousel.data.arrowText.regularSlideArrow.isEnabled;
    },

    toggleArrowText: (state) => {
      state.carousel.data.arrowText.isOnlyArrow =
        !state.carousel.data.arrowText.isOnlyArrow;
    },

    setArrowId: (state, action: PayloadAction<string>) => {
      state.carousel.data.arrowText.arrowId = action.payload;
    },

    randomize: (state) => {
      const randomFontPairIndex = Math.floor(Math.random() * fontPairs.length);
      const fontPair = fontPairs[randomFontPairIndex];

      const colorsGroup = [...darkColors, ...lightColors];
      const randomColorsIndex = Math.floor(Math.random() * colorsGroup.length);
      const colors = colorsGroup[randomColorsIndex];

      const randomIsAlternateColorsIndex = Math.floor(Math.random() * 2);

      const randomBackgroundIdIndex = Math.floor(Math.random() * 24);

      const randomCornerElementIndex = Math.floor(Math.random() * 4);

      state.carousel.data.contentText.primaryFont = fontPair.primaryFont;
      state.carousel.data.contentText.secondaryFont = fontPair.secondaryFont;
      state.carousel.data.colors.backgroundColor = colors.backgroundColor;
      state.carousel.data.colors.textColor = colors.textColor;
      state.carousel.data.colors.accentColor = colors.accentColor;
      state.carousel.data.colors.isAlternateSlideColors = [true, false][
        randomIsAlternateColorsIndex
      ];
      state.carousel.data.backgroundOverlay.backgroundId = `background_${randomBackgroundIdIndex}`;
      state.carousel.data.backgroundOverlay.cornerElementId = `element_${randomCornerElementIndex}`;
    },
  },
});

export const {
  setOnceCarouselsFetched,
  setActiveNavPanel,
  setActiveNavPanelAndIndex,
  setAiTotalSlides,
  setAiPanelSelectedTab,
  setAiTopic,
  setAiText,
  setAiURL,
  setCarousels,
  addNewCarousel,
  updateCarousel,
  removeCarousel,
  setCarousel,
  setCarouselId,
  setCurrentIndex,
  setTitle,
  setImageSrc,
  setSlideRatio,
  addNewSlide,
  resetNewSlide,
  removeSlide,
  reorderSlides,
  setSlides,
  setContentSelectedTab,
  setContentOrientation,
  toggleNewSlideSubTitle,
  setNewSlideSubTitle,
  toggleNewSlideTitle,
  setNewSlideTitle,
  toggleNewSlideDescription,
  setNewSlideDescription,
  toggleNewSlideImage,
  setNewSlideImageSrc,
  toggleSlideSubTitle,
  setSlideSubTitle,
  toggleSlideTitle,
  setSlideTitle,
  setSlideTitleFontSize,
  setSlideDescription,
  setSlideDescriptionFontSize,
  toggleSlideDescription,
  setSlideCTAText,
  toggleSlideCTAButton,
  setSlideImageSrc,
  toggleSlideImage,
  setSlideImageOpacity,
  setSlideImageBackgroundPosition,
  toggleSlideImageBackgroundCover,
  toggleSlideBackgroundImage,
  setSlideBackgroundImageSrc,
  setSlideBackgroundImageOpacity,
  setSlideBackgroundImageBackgroundPosition,
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
  randomize,
} = carouselsSlice.actions;

export default carouselsSlice.reducer;
