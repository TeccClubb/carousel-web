"use client";
import React, { FC, memo, useEffect, useState } from "react";
import {
  AiIcon,
  BackgroundIcon,
  BrandingIcon,
  ColorsIcon,
  ContentIcon,
  MyCarouselsIcon,
  OrderIcon,
  SettingsIcon,
  SwipeIcon,
  TextIcon,
} from "@/icons";
import { Badge } from "../ui/badge";
import { Button, LinkButton } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Ai from "./Ai";
import Content from "./Content";
import Text from "./Text";
import Colors from "./Colors";
import Background from "./Background";
import Branding from "./Branding";
import Swipe from "./Swipe";
import Order from "./Order";
import Settings from "./Settings";
import MyCarousels from "./MyCarousels";
import Randomize from "./Randomize";
import CarouselSlider from "./CarouselSlider";
import { Check, Shuffle, Zap } from "lucide-react";
import { useCarousels } from "@/hooks/use-carousels";
import { useDispatch } from "react-redux";
import { setZoomValue } from "@/store/app.slice";
import { NavPanel } from "@/types";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import {
  setActiveNavPanel,
  setSignUpFirstDialogIsOpen,
  setUpgradeProDialogIsOpen,
} from "@/store/carousels.slice";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { PRICING_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/pathNames";

const AiGenerator: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const { activeNavPanel, signUpFirstDialogIsOpen, upgradeProDialogIsOpen } =
    useCarouselsState();
  const {
    carousel: {
      data: {
        contentText: { primaryFont, secondaryFont },
      },
    },
  } = useCarousels();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const navPanels: NavPanel[] = [
    "ai",
    "content",
    "text",
    "colors",
    "background",
    "branding",
    "swipe",
    "order",
    "settings",
    "randomize",
    "my_carousels",
  ];

  const items = {
    ai: {
      name: "AI",
      title: t("ai_carousel"),
      icon: <AiIcon />,
      container: <Ai />,
    },
    content: {
      name: t("content"),
      title: t("content_settings"),
      icon: <ContentIcon />,
      container: <Content />,
    },
    text: {
      name: t("text"),
      title: t("text_settings"),
      icon: <TextIcon />,
      container: <Text />,
    },
    colors: {
      name: t("colors"),
      title: t("color_settings"),
      icon: <ColorsIcon />,
      container: <Colors />,
    },
    background: {
      name: t("background"),
      title: t("background_settings"),
      icon: <BackgroundIcon />,
      container: <Background />,
    },
    branding: {
      name: t("branding"),
      title: t("branding_settings"),
      icon: <BrandingIcon />,
      container: <Branding />,
    },
    swipe: {
      name: t("swipe"),
      title: t("swipe_indicator_settings"),
      icon: <SwipeIcon />,
      container: <Swipe />,
    },
    order: {
      name: t("order"),
      title: t("slide_order_settings"),
      icon: <OrderIcon />,
      container: <Order />,
    },
    settings: {
      name: t("settings"),
      title: t("general_settings"),
      icon: <SettingsIcon />,
      container: <Settings />,
    },
    randomize: {
      name: t("randomize"),
      title: t("randomize"),
      icon: <Shuffle className="h-5 w-5" />,
      container: <Randomize />,
    },
    my_carousels: {
      name: t("my_carousels"),
      title: t("my_carousels"),
      icon: <MyCarouselsIcon />,
      container: <MyCarousels />,
    },
  };

  const signupFirstOfferOptions: string[] = [
    t("ai_carousel_generator_10_free_credits"),
    t("topic_to_carousel_using_aI"),
    t("custom_text_to_carousel_using_ai"),
    t("url_to_carousel_using_ai"),
    t("media_upload_feature"),
    t("custom_font_pairing"),
    t("custom_color_palettes"),
  ];

  const upgradeOfferOptions: string[] = [
    t("unlimited_ai_carousel_generator"),
    t("carousel_with_20_slides"),
    t("unlimited_downloads"),
    t("remove_watermark"),
    t("custom_font_pair"),
    t("custom_color_palette"),
    t("save_and_continue_carousel"),
    t("priority_support"),
  ];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = primaryFont.href;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [primaryFont.href]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = secondaryFont.href;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [secondaryFont.href]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      const sliderDiv = document.getElementById("carousel-slider");
      if (sliderDiv) {
        const width = sliderDiv.offsetWidth;
        const height = sliderDiv.offsetHeight;
        const area = width * height;
        const fontSize = Math.round(Math.sqrt(area) / 23.42);
        dispatch(setZoomValue(Math.min(Math.max(fontSize, 20), 100)));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start gap-0 overflow-hidden">
      <div className="w-auto min-h-[calc(100vh-4rem)] border-r overflow-auto">
        <div className="flex flex-col gap-4 py-2">
          <nav className="grid gap-1 px-2 justify-center">
            <TooltipProvider>
              <ul>
                {navPanels.map((panel) => (
                  <li key={panel}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={
                            activeNavPanel === panel ? "default" : "ghost"
                          }
                          size="icon"
                          onClick={() => {
                            dispatch(setActiveNavPanel(panel));
                            if (isMobile) setDrawerOpen(true);
                          }}
                          className={`[&_svg]:size-5 ${
                            activeNavPanel === panel && panel === "ai"
                              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0"
                              : ""
                          }`}
                        >
                          {items[panel].icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <span>{items[panel].name}</span>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </TooltipProvider>
          </nav>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent
          className="mt-24 max-h-[60vh]"
          style={{
            pointerEvents: "auto",
            transition: "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          <DrawerHeader className="flex items-center px-4 py-3">
            <DrawerTitle className="text-xl font-bold">
              {items[activeNavPanel].title}
            </DrawerTitle>
            <DrawerDescription className="hidden">
              {items[activeNavPanel].name}
            </DrawerDescription>
            <DrawerClose asChild className="ml-auto">
              <Button variant="ghost">{t("close")}</Button>
            </DrawerClose>
          </DrawerHeader>

          <Separator />

          <ScrollArea className="h-[60vh]">
            {items[activeNavPanel].container}
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <ScrollArea className="w-80 h-[calc(100vh-4rem)] hidden md:flex border-r">
        {items[activeNavPanel].container}
      </ScrollArea>
      <ScrollArea
        className="h-[calc(100vh-4rem)] flex-1 lg:border-x relative"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <CarouselSlider />
      </ScrollArea>

      <Dialog
        open={signUpFirstDialogIsOpen}
        onOpenChange={(isOpen) => dispatch(setSignUpFirstDialogIsOpen(isOpen))}
      >
        <DialogContent className="w-full max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="self-center font-bold text-xl">
              {t("signup_to_unlock_special_features")}
            </DialogTitle>
            <DialogDescription className="hidden">
              {t("signup_to_unlock_special_features")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {signupFirstOfferOptions.map((option) => (
              <div key={option} className="flex items-center">
                <Check className="size-5 text-green-600 m-2" />
                <div className="font-semibold text-sm">{option}</div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              onClick={() => router.push(SIGNUP_PAGE_PATH)}
              type="submit"
              className="w-full"
            >
              {t("sign_up_for_free")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={upgradeProDialogIsOpen}
        onOpenChange={(isOpen) => dispatch(setUpgradeProDialogIsOpen(isOpen))}
      >
        <DialogContent className="w-full max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="self-center font-bold text-xl">
              {t("upgrade_to_carousel_builder")}
              <Badge className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 uppercase text-sm py-1 ml-2">
                Pro
              </Badge>
            </DialogTitle>
            <DialogDescription className="hidden">
              {t("upgrade_to_carousel_builder")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {upgradeOfferOptions.map((option) => (
              <div key={option} className="flex items-center">
                <Check className="size-5 text-green-600 m-2" />
                <div className="font-semibold text-sm">{option}</div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <LinkButton
              href={PRICING_PAGE_PATH}
              size="sm"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs w-full"
            >
              {t("upgrade_to_pro")} <Zap className="fill-primary-foreground" />
            </LinkButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(AiGenerator);
