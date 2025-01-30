import React, { FC } from "react";
import { InputColor, Switch } from "../ui";
import { darkColors, lightColors } from "@/assets/slide-colors";
import { useColors } from "@/hooks";
import { useDispatch } from "react-redux";
import {
  setAccentColor,
  setBackgroundColor,
  setColors,
  setTextColor,
  toggleAlternateSlideColors,
  toggleCustomColors,
} from "@/store";
import { useTranslation } from "react-i18next";

const Colors: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    isUseCustomColors,
    isAlternateSlideColors,
    backgroundColor,
    textColor,
    accentColor,
  } = useColors();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 pb-1">
            <Switch
              checked={isUseCustomColors}
              onCheckedChange={() => dispatch(toggleCustomColors())}
              label={t("colors_panel_switch_custom_colors_label")}
            />
          </div>
          {isUseCustomColors && (
            <div className="flex flex-wrap gap-2 border rounded-lg p-2">
              <div>
                <InputColor
                  color={backgroundColor}
                  setColor={(color) => dispatch(setBackgroundColor(color))}
                  label={t("colors_panel_background_color_label")}
                />
              </div>
              <div>
                <InputColor
                  color={textColor}
                  setColor={(color) => dispatch(setTextColor(color))}
                  label={t("colors_panel_text_color_label")}
                />
              </div>
              <div>
                <InputColor
                  color={accentColor}
                  setColor={(color) => dispatch(setAccentColor(color))}
                  label={t("colors_panel_accent_color_label")}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pb-1">
          <Switch
            checked={isAlternateSlideColors}
            onCheckedChange={() => dispatch(toggleAlternateSlideColors())}
            label={t("colors_panel_switch_alternate_colors_label")}
          />
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div>
          <h3 className="pb-2 font-semibold leading-none tracking-tight">
            {t("colors_panel_dark_colors_label")}
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
            {t("colors_panel_light_colors_label")}
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

export default Colors;
