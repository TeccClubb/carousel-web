import React, { FC, useState } from "react";
import { Checkbox, Label, Slider } from "../ui";
import { backgroundPattern } from "@/assets/slide-backgrounds";

const Background: FC = () => {
  const [activeOverlayColor, setActiveOverlayColor] =
    useState<string>("#FFFFFF");

  const [isFadeCorner, setIsFadeCorner] = useState<boolean>(true);

  const overlayColors = ["#FFFFFF", "#000000", "#808080"];

  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.08);

  const [elementOpacity, setElementOpacity] = useState<number>(0.2);

  const [activeBackgroundId, setActiveBackgroundId] =
    useState<string>("background_1");

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

  const [activeElementId, setActiveElementId] = useState<string>("element_3");

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
              Overlay
            </h3>
          </legend>

          <div className="flex justify-between">
            <div className="flex gap-1">
              {overlayColors.map((overlayColor) => (
                <div
                  key={overlayColor}
                  onClick={() => setActiveOverlayColor(overlayColor)}
                  style={{ backgroundColor: overlayColor }}
                  className={`w-6 h-6 rounded-full border-2 ${
                    overlayColor === activeOverlayColor ? "border-primary" : ""
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between gap-2 items-center">
              <Label htmlFor="fadeCornerActive">Fade Corner</Label>
              <Checkbox
                id="fadeCornerActive"
                checked={isFadeCorner}
                onCheckedChange={() => setIsFadeCorner((prev) => !prev)}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {backgroundIds.map((backgroundId) => (
              <div
                key={backgroundId}
                style={backgroundPattern({ backgroundId })}
                onClick={() => setActiveBackgroundId(backgroundId)}
                className={`w-12 h-12 cursor-pointer rounded-lg border-2 ${
                  activeBackgroundId === backgroundId ? "border-primary" : ""
                } ${
                  backgroundId === "background_0"
                    ? "text-primary text-xs flex justify-center items-center font-semibold"
                    : ""
                }`}
              >
                {backgroundId === "background_0" && "None"}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between align-top">
              <Label>Overlay Opacity</Label>
              <p className="text-sm text-muted-foreground">{overlayOpacity * 100}</p>
            </div>

            <Slider
              defaultValue={[overlayOpacity * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setOverlayOpacity(value[0] / 100)}
            />
          </div>
        </fieldset>

        <fieldset className="grid gap-6 rounded-lg border p-4 pb-8">
          <legend className="-ml-1 px-1 text-sm font-medium">
            <h3 className="font-semibold leading-none tracking-tight">
              Element
            </h3>
          </legend>

          <div className="grid grid-cols-5 gap-2">
            {elements.map((element) => (
              <div
                key={element.id}
                className={`w-12 h-12 cursor-pointer rounded-lg border-2 ${
                  element.id === "element_0" ? "text-primary text-xs flex justify-center items-center font-semibold" : ""
                } ${activeElementId === element.id ? "border-primary" : ""}`}
                onClick={() => setActiveElementId(element.id)}
                style={{
                  backgroundImage: `url('data:image/svg+xml;base64,${btoa(
                    element.icon
                  )}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                {element.id === "element_0" && "None"}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between align-top">
              <Label>Element Opacity</Label>
              <p className="text-sm text-muted-foreground">{elementOpacity * 100}</p>
            </div>

            <Slider
              defaultValue={[elementOpacity * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setElementOpacity(value[0] / 100)}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Background;
