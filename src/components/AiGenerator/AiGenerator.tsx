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

const AiGenerator: FC = () => {
  const dispatch = useDispatch();
  const {
    carousel: {
      data: {
        contentText: { primaryFont, secondaryFont },
      },
    },
  } = useCarousels();

  type NavItem =
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

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [divWidth, setDivWidth] = useState<number>(0);
  const [divHeight, setDivHeight] = useState<number>(0);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [activeNavItem, setActiveNavItem] = useState<NavItem>("ai");

  const navItems: NavItem[] = [
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
      title: "AI Carousel",
      icon: <AiIcon />,
      container: <Ai />,
    },
    content: {
      name: "Content",
      title: "Content Settings",
      icon: <ContentIcon />,
      container: <Content />,
    },
    text: {
      name: "Text",
      title: "Text Settings",
      icon: <TextIcon />,
      container: <Text />,
    },
    colors: {
      name: "Colors",
      title: "Color Settings",
      icon: <ColorsIcon />,
      container: <Colors />,
    },
    background: {
      name: "Background",
      title: "Background Settings",
      icon: <BackgroundIcon />,
      container: <Background />,
    },
    branding: {
      name: "Branding",
      title: "Branding Settings",
      icon: <BrandingIcon />,
      container: <Branding />,
    },
    swipe: {
      name: "Swipe",
      title: "Swipe Indicator Settings",
      icon: <SwipeIcon />,
      container: <Swipe />,
    },
    order: {
      name: "Order",
      title: "Slide Order Settings",
      icon: <OrderIcon />,
      container: <Order />,
    },
    settings: {
      name: "Settings",
      title: "General Settings",
      icon: <SettingsIcon />,
      container: <Settings />,
    },
    randomize: {
      name: "Randomize",
      title: "Randomize",
      icon: <Shuffle className="h-5 w-5" />,
      container: <Randomize />,
    },
    my_carousels: {
      name: "My Carousels",
      title: "My Carousels",
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

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //     const sliderDiv = document.getElementById("carousel-slider");
  //     if (sliderDiv) {
  //       const fontSize = Math.round(
  //         (sliderDiv.offsetWidth / sliderDiv.offsetHeight) * 17.26
  //       );
  //       dispatch(setZoomValue(fontSize));
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [dispatch]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start gap-0 overflow-hidden">
      <div className="w-auto min-h-[calc(100vh-4rem)] border-r overflow-auto">
        <div className="flex flex-col gap-4 py-2">
          <nav className="grid gap-1 px-2 justify-center">
            <TooltipProvider>
              <ul>
                {navItems.map((item) => (
                  <li key={item}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={activeNavItem === item ? "default" : "ghost"}
                          size="icon"
                          onClick={() => {
                            setActiveNavItem(item);
                            if (isMobile) setDrawerOpen(true);
                          }}
                          className={`[&_svg]:size-5 ${
                            activeNavItem === item && item === "ai"
                              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0"
                              : ""
                          }`}
                        >
                          {items[item].icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <span>{items[item].name}</span>
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
              {items[activeNavItem].title}
            </DrawerTitle>
            <DrawerDescription className="hidden">
              {items[activeNavItem].name}
            </DrawerDescription>
            <DrawerClose asChild className="ml-auto">
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerHeader>

          <Separator />

          <ScrollArea className="h-[60vh]">
            {items[activeNavItem].container}
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <ScrollArea className="w-80 h-[calc(100vh-4rem)] hidden md:flex border-r">
        {items[activeNavItem].container}
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
