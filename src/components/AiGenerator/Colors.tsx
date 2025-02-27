import React, { FC, memo } from "react";
import { InputColor, Switch } from "../ui";
import { darkColors, lightColors } from "@/assets/slide-colors";
import { useDispatch } from "react-redux";
import {
  setAccentColor,
  setBackgroundColor,
  setColors,
  setTextColor,
  toggleAlternateSlideColors,
  toggleCustomColors,
} from "@/store/carousels.slice";
import { useCarouselsState } from "@/hooks/use-carousels-state";

const Colors: FC = () => {
  const dispatch = useDispatch();

  const {
    carousel: {
      data: {
        colors: {
          isUseCustomColors,
          isAlternateSlideColors,
          backgroundColor,
          textColor,
          accentColor,
        },
      },
    },
  } = useCarouselsState();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 pb-1">
            <Switch
              checked={isUseCustomColors}
              onCheckedChange={() => dispatch(toggleCustomColors())}
              label="Use Custom Colors"
            />
          </div>
          {isUseCustomColors && (
            <div className="flex flex-wrap gap-2 border rounded-lg p-2">
              <div>
                <InputColor
                  color={backgroundColor}
                  setColor={(color) => dispatch(setBackgroundColor(color))}
                  label="Background Color"
                />
              </div>
              <div>
                <InputColor
                  color={textColor}
                  setColor={(color) => dispatch(setTextColor(color))}
                  label="Text Color"
                />
              </div>
              <div>
                <InputColor
                  color={accentColor}
                  setColor={(color) => dispatch(setAccentColor(color))}
                  label="Accent Color"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pb-1">
          <Switch
            checked={isAlternateSlideColors}
            onCheckedChange={() => dispatch(toggleAlternateSlideColors())}
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
            {darkColors.map((colors) => {
              const isActiveColors =
                textColor === colors.textColor &&
                accentColor === colors.accentColor &&
                backgroundColor === colors.backgroundColor;
              return (
                <div
                  key={colors.id}
                  onClick={() =>
                    dispatch(
                      setColors({
                        backgroundColor: colors.backgroundColor,
                        textColor: colors.textColor,
                        accentColor: colors.accentColor,
                      })
                    )
                  }
                  className={`flex flex-col gap-0.5 justify-center items-center border-2 overflow-hidden rounded-xl ${
                    isActiveColors ? "border-primary" : ""
                  }`}
                >
                  <div className="flex gap-0.5">
                    <div
                      style={{ background: colors.textColor }}
                      className="h-5 w-7"
                    ></div>
                    <div
                      className="h-5 w-7"
                      style={{ background: colors.accentColor }}
                    ></div>
                  </div>
                  <div
                    className="h-5 w-full"
                    style={{ background: colors.backgroundColor }}
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
            {lightColors.map((colors) => {
              const isActiveColors =
                textColor === colors.textColor &&
                accentColor === colors.accentColor &&
                backgroundColor === colors.backgroundColor;
              return (
                <div
                  key={colors.id}
                  onClick={() =>
                    dispatch(
                      setColors({
                        backgroundColor: colors.backgroundColor,
                        textColor: colors.textColor,
                        accentColor: colors.accentColor,
                      })
                    )
                  }
                  className={`flex flex-col gap-0.5 justify-center items-center border-2 overflow-hidden rounded-xl ${
                    isActiveColors ? "border-primary" : ""
                  }`}
                >
                  <div className="flex gap-0.5">
                    <div
                      style={{ background: colors.textColor }}
                      className="h-5 w-7"
                    ></div>
                    <div
                      className="h-5 w-7"
                      style={{ background: colors.accentColor }}
                    ></div>
                  </div>
                  <div
                    className="h-5 w-full"
                    style={{ background: colors.backgroundColor }}
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

export default memo(Colors);
