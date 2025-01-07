import React, { FC, useState } from "react";
import { InputColor, RadioButton } from "../ui";
import { darkColors, lightColors } from "@/assets/slide-colors";

const Colors: FC = () => {
  const [isUseCustomColors, setIsUseCustomColors] = useState<boolean>(true);
  const [isAlternateSlideColors, setIsAlternateSlideColors] =
    useState<boolean>(true);

  const [backgroundColor, setBackgroundColor] = useState<string>("#160910");
  const [textColor, setTextColor] = useState<string>("#e7d8c7");
  const [accentColor, setAccentColor] = useState<string>("#ef922d");

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 pb-1">
            <RadioButton
              checked={isUseCustomColors}
              setChecked={setIsUseCustomColors}
              label="Use Custom Colors"
            />
          </div>
          <div className="flex flex-wrap gap-2 border rounded-lg p-2">
            <div>
              <InputColor
                color={backgroundColor}
                setColor={setBackgroundColor}
                label="Background Color"
              />
            </div>
            <div>
              <InputColor
                color={textColor}
                setColor={setTextColor}
                label="Text Color"
              />
            </div>
            <div>
              <InputColor
                color={accentColor}
                setColor={setAccentColor}
                label="Accent Color"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-1">
          <RadioButton
            checked={isAlternateSlideColors}
            setChecked={setIsAlternateSlideColors}
            label="Alternate Slide Colors"
          />
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div>
          <h3 className="pb-2 font-semibold leading-none tracking-tight">
            Dark
          </h3>
          <div className="flex space-between flex-wrap gap-2">
            {darkColors.map((color) => {
              const isActiveColors =
                textColor === color.textColor &&
                accentColor === color.accentColor &&
                backgroundColor === color.backgroundColor;
              return (
                <div
                  key={color.id}
                  onClick={() => {
                    setTextColor(color.textColor);
                    setAccentColor(color.accentColor);
                    setBackgroundColor(color.backgroundColor);
                  }}
                  className={`flex flex-col gap-0.5 justify-center items-center border-2 overflow-hidden rounded-xl ${
                    isActiveColors ? "border-primary" : ""
                  }`}
                >
                  <div className="flex gap-0.5">
                    <div
                      style={{ background: color.textColor }}
                      className="h-5 w-7"
                    ></div>
                    <div
                      className="h-5 w-7"
                      style={{ background: color.accentColor }}
                    ></div>
                  </div>
                  <div
                    className="h-5 w-full"
                    style={{ background: color.backgroundColor }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="pb-2 font-semibold leading-none tracking-tight">
            Light
          </h3>
          <div className="flex space-between flex-wrap gap-2">
            {lightColors.map((color) => {
              const isActiveColors =
                textColor === color.textColor &&
                accentColor === color.accentColor &&
                backgroundColor === color.backgroundColor;
              return (
                <div
                  key={color.id}
                  onClick={() => {
                    setTextColor(color.textColor);
                    setAccentColor(color.accentColor);
                    setBackgroundColor(color.backgroundColor);
                  }}
                  className={`flex flex-col gap-0.5 justify-center items-center border-2 overflow-hidden rounded-xl ${
                    isActiveColors ? "border-primary" : ""
                  }`}
                >
                  <div className="flex gap-0.5">
                    <div
                      style={{ background: color.textColor }}
                      className="h-5 w-7"
                    ></div>
                    <div
                      className="h-5 w-7"
                      style={{ background: color.accentColor }}
                    ></div>
                  </div>
                  <div
                    className="h-5 w-full"
                    style={{ background: color.backgroundColor }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colors;
