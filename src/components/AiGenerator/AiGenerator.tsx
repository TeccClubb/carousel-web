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
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
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
import { Shuffle } from "lucide-react";
import { useCarousels } from "@/hooks/use-carousels";
import { useDispatch } from "react-redux";
import { setZoomValue } from "@/store/app.slice";
import { NavPanel } from "@/types";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { setActiveNavPanel } from "@/store/carousels.slice";
import { useTranslations } from "next-intl";

const AiGenerator: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { activeNavPanel } = useCarouselsState();
  const {
    carousel: {
      data: {
        contentText: { primaryFont, secondaryFont },
      },
    },
  } = useCarousels();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [divWidth, setDivWidth] = useState<number>(0);
  const [divHeight, setDivHeight] = useState<number>(0);
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
        setDivWidth(sliderDiv.offsetWidth);
        setDivHeight(sliderDiv.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fontSize = Math.round((divWidth / divHeight) * 17.26);
    dispatch(setZoomValue(fontSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divWidth]);

  useEffect(() => {
    const fontSize = Math.round((divWidth / divHeight) * 17.26);
    dispatch(setZoomValue(fontSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divHeight]);

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
    </div>
  );
};

export default memo(AiGenerator);
