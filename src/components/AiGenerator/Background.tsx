import React, { FC, memo } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { backgroundPattern } from "@/assets/slide-backgrounds";
import {
  setBackgroundId,
  setOverlayColor,
  setOverlayOpacity,
  toggleOverlayFadeCorner,
  setCornerElementId,
  setCornerElementOpacity,
} from "@/store/carousels.slice";
import { useDispatch } from "react-redux";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useTranslations } from "next-intl";

const Background: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();

  const {
    carousel: {
      data: {
        backgroundOverlay: {
          backgroundId,
          overlayColor,
          overlayOpacity = 8,
          isOverlayFadeCorner,
          cornerElementId,
          cornerElementOpacity = 20,
        },
      },
    },
  } = useCarouselsState();

  const overlayColors = ["#FFFFFF", "#000000", "#808080"];

  const backgroundIds = [
    "background_0",
    "background_1",
    "background_2",
    "background_3",
    "background_4",
    "background_5",
    "background_6",
    "background_7",
    "background_8",
    "background_9",
    "background_10",
    "background_11",
    "background_12",
    "background_13",
    "background_14",
    "background_15",
    "background_16",
    "background_17",
    "background_18",
    "background_19",
    "background_20",
    "background_21",
    "background_22",
    "background_23",
  ];

  const elements = [
    {
      id: "element_0",
      icon: "",
    },

    {
      id: "element_1",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0"/><path d="M13 18l6 -6"/><path d="M13 6l6 6"/></svg>`,
    },

    {
      id: "element_2",
      icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },

    {
      id: "element_3",
      icon: `<svg width="24px" height="24px" transform="rotate(270)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12C3 16.9706 7.02944 21 12 21V3C7.02944 3 3 7.02944 3 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
  ];

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <fieldset className="grid gap-6 rounded-lg border p-4 pb-8">
          <legend className="-ml-1 px-1 text-sm font-medium">
            <h3 className="font-semibold leading-none tracking-tight">
              {t("overlay")}
            </h3>
          </legend>

          <div className="flex justify-between">
            <div className="flex gap-1">
              {overlayColors.map((color) => (
                <div
                  key={color}
                  onClick={() => dispatch(setOverlayColor(color))}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full border-2 ${
                    color === overlayColor ? "border-primary" : ""
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between gap-2 items-center">
              <Label htmlFor="fadeCornerActive">{t("fade_corner")}</Label>
              <Checkbox
                id="fadeCornerActive"
                checked={isOverlayFadeCorner}
                onCheckedChange={() => dispatch(toggleOverlayFadeCorner())}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {backgroundIds.map((bgId) => (
              <div
                key={bgId}
                style={backgroundPattern({ backgroundId: bgId })}
                onClick={() => dispatch(setBackgroundId(bgId))}
                className={`w-12 h-12 cursor-pointer rounded-lg border-2 ${
                  backgroundId === bgId ? "border-primary" : ""
                } ${
                  bgId === "background_0"
                    ? "text-primary text-xs flex justify-center items-center font-semibold"
                    : ""
                }`}
              >
                {bgId === "background_0" && t("none")}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between align-top">
              <Label asSpan>{t("overlay_opacity")}</Label>
              <p className="text-sm text-muted-foreground">{overlayOpacity}</p>
            </div>

            <Slider
              value={[overlayOpacity]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => dispatch(setOverlayOpacity(value[0]))}
            />
          </div>
        </fieldset>

        <fieldset className="grid gap-6 rounded-lg border p-4 pb-8">
          <legend className="-ml-1 px-1 text-sm font-medium">
            <h3 className="font-semibold leading-none tracking-tight">
              {t("element")}
            </h3>
          </legend>

          <div className="grid grid-cols-5 gap-2">
            {elements.map((element) => (
              <div
                key={element.id}
                className={`w-12 h-12 cursor-pointer rounded-lg border-2 ${
                  element.id === "element_0"
                    ? "text-primary text-xs flex justify-center items-center font-semibold"
                    : ""
                } ${cornerElementId === element.id ? "border-primary" : ""}`}
                onClick={() => dispatch(setCornerElementId(element.id))}
                style={{
                  backgroundImage: `url('data:image/svg+xml;base64,${btoa(
                    element.icon
                  )}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                {element.id === "element_0" && t("none")}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between align-top">
              <Label asSpan>{t("element_opacity")}</Label>
              <p className="text-sm text-muted-foreground">
                {cornerElementOpacity}
              </p>
            </div>

            <Slider
              value={[cornerElementOpacity]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) =>
                dispatch(setCornerElementOpacity(value[0]))
              }
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default memo(Background);
