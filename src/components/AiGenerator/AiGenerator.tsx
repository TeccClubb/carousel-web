"use client";
import React from "react";
import {
  AiIcon,
  BackgroundIcon,
  BrandingIcon,
  ColorsIcon,
  ContentIcon,
  MyCarouselsIcon,
  OrderIcon,
  SettingsIcon,
  ArrowsShuffleIcon,
  SwipeIcon,
  TextIcon,
} from "@/icons";
import { useActiveNavItem } from "@/hooks";
import { useDispatch } from "react-redux";
import { setActiveItem } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import Slider from "../AiSlider/Slider";
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
import { NavItem } from "@/types";

const AiGenerator = () => {
  const dispatch = useDispatch();

  const activeItem = useActiveNavItem();

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
    content: { name: "Content", icon: <ContentIcon />, container: <Content /> },
    text: { name: "Text", icon: <TextIcon />, container: <Text /> },
    colors: { name: "Colors", icon: <ColorsIcon />, container: <Colors /> },
    background: {
      name: "Background",
      icon: <BackgroundIcon />,
      container: <Background />,
    },
    branding: {
      name: "Branding",
      icon: <BrandingIcon />,
      container: <Branding />,
    },
    swipe: { name: "Swipe", icon: <SwipeIcon />, container: <Swipe /> },
    order: { name: "Order", icon: <OrderIcon />, container: <Order /> },
    settings: {
      name: "Settings",
      icon: <SettingsIcon />,
      container: <Settings />,
    },
    randomize: {
      name: "Randomize",
      icon: <ArrowsShuffleIcon />,
      container: <Randomize />,
    },
    my_carousels: {
      name: "My Carousels",
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
                  <TooltipTrigger>
                    <div
                      key={item}
                      onClick={() => dispatch(setActiveItem(item))}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 cursor-pointer ${
                        activeItem === item
                          ? `${
                              item === "ai"
                                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0"
                                : "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                            } dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white`
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {items[item].icon}
                    </div>
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

      <div className="w-80 min-h-[calc(100vh-4rem)] hidden md:flex border-r">
        {items[activeItem].container && items[activeItem].container}
      </div>
      <div
        className="min-h-[calc(100vh-4rem)] flex-1 lg:border-x relative"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <Slider />
      </div>
    </div>
  );
};

export default AiGenerator;
