"use client";
import React, { FC, useState } from "react";
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
  ScrollArea,
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
import { useTranslation } from "react-i18next";
import { Shuffle } from "lucide-react";

const AiGenerator: FC = () => {
  const { t } = useTranslation();

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
    ai: { name: "AI", icon: <AiIcon />, container: <Ai /> },
    content: {
      name: t("content"),
      icon: <ContentIcon />,
      container: <Content />,
    },
    text: { name: t("text"), icon: <TextIcon />, container: <Text /> },
    colors: { name: t("colors"), icon: <ColorsIcon />, container: <Colors /> },
    background: {
      name: t("background"),
      icon: <BackgroundIcon />,
      container: <Background />,
    },
    branding: {
      name: t("branding"),
      icon: <BrandingIcon />,
      container: <Branding />,
    },
    swipe: { name: t("swipe"), icon: <SwipeIcon />, container: <Swipe /> },
    order: { name: t("order"), icon: <OrderIcon />, container: <Order /> },
    settings: {
      name: t("settings"),
      icon: <SettingsIcon />,
      container: <Settings />,
    },
    randomize: {
      name: t("randomize"),
      icon: <Shuffle className="h-5 w-5" />,
      container: <Randomize />,
    },
    my_carousels: {
      name: t("my_carousels"),
      icon: <MyCarouselsIcon />,
      container: <MyCarousels />,
    },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start gap-0 overflow-hidden">
      <div className="w-auto min-h-[calc(100vh-4rem)] border-r overflow-auto">
        <div className="flex flex-col gap-4 py-2">
          <nav className="grid gap-1 px-2 justify-center">
            {navItems.map((item) => (
              <TooltipProvider key={item}>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setActiveNavItem(item)}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 cursor-pointer ${
                      activeNavItem === item
                        ? `${
                            item === "ai"
                              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0"
                              : "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                          } dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white`
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {items[item].icon}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span>{items[item].name}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </div>
      </div>

      <ScrollArea className="w-80 h-[calc(100vh-4rem)] hidden md:flex border-r">
        {items[activeNavItem].container && items[activeNavItem].container}
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

export default AiGenerator;
