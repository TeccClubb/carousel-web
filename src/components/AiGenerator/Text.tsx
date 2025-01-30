import React, { FC, useEffect } from "react";
import { Button, Combobox, ComboboxItem, Label, Slider, Switch } from "../ui";
import { useContentText } from "@/hooks";
import {
  setContentFontSize,
  setContentFontTextAlignment,
  setPrimaryFont,
  setSecondaryFont,
  setFontPair,
  toggleCustomFontsEnabled,
} from "@/store";
import { useDispatch } from "react-redux";
import { googleFonts, fontPairs } from "@/assets/fonts";
import { useTranslation } from "react-i18next";

const Text: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const textAlignments: {
    alignment: "left" | "center" | "right";
    text: string;
  }[] = [
    { alignment: "left", text: t("text_panel_alignment_left_text") },
    { alignment: "center", text: t("text_panel_alignment_center_text") },
    { alignment: "right", text: t("text_panel_alignment_right_text") },
  ];

  const {
    isCustomFontsEnabled,
    primaryFont,
    secondaryFont,
    fontSize,
    fontTextAlignment,
  } = useContentText();

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

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 pb-2">
            <Switch
              checked={isCustomFontsEnabled}
              onCheckedChange={() => dispatch(toggleCustomFontsEnabled())}
              label={t("text_panel_switch_custom_fonts_label")}
            />
          </div>

          {isCustomFontsEnabled && (
            <div className="space-y-4 p-2 border rounded-lg">
              <div className="flex flex-col space-y-1">
                <Combobox
                  label={t("text_panel_primary_font_label")}
                  value={primaryFont.href}
                  text={primaryFont.name}
                  emptyMessage={t("text_panel_font_empty_message")}
                  placeholder={t("text_panel_primary_font_placeholder")}
                  className="w-full"
                  size="sm"
                >
                  {googleFonts.map((font) => (
                    <ComboboxItem
                      key={font.href}
                      value={font.href}
                      onSelect={() => dispatch(setPrimaryFont(font))}
                    >
                      {font.name}
                    </ComboboxItem>
                  ))}
                </Combobox>
              </div>

              <div className="flex flex-col space-y-1">
                <Combobox
                  label={t("text_panel_secondary_font_label")}
                  value={secondaryFont.href}
                  text={secondaryFont.name}
                  emptyMessage={t("text_panel_font_empty_message")}
                  placeholder={t("text_panel_secondary_font_placeholder")}
                  className="w-full"
                  size="sm"
                >
                  {googleFonts.map((font) => (
                    <ComboboxItem
                      key={font.href}
                      value={font.href}
                      onSelect={() => dispatch(setSecondaryFont(font))}
                    >
                      {font.name}
                    </ComboboxItem>
                  ))}
                </Combobox>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <Combobox
            label={t("text_panel_font_pair_label")}
            value={`${primaryFont.href} & ${secondaryFont.href}`}
            text={`${primaryFont.name} & ${secondaryFont.name}`}
            emptyMessage={t("text_panel_font_empty_message")}
            placeholder={t("text_panel_font_pair_placeholder")}
            className="w-full"
            size="sm"
          >
            {fontPairs.map((fontPair) => (
              <ComboboxItem
                key={`${fontPair.primaryFont.href} & ${fontPair.secondaryFont.href}`}
                value={`${fontPair.primaryFont.href} & ${fontPair.secondaryFont.href}`}
                onSelect={() => dispatch(setFontPair(fontPair))}
              >
                {`${fontPair.primaryFont.name} & ${fontPair.secondaryFont.name}`}
              </ComboboxItem>
            ))}
          </Combobox>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between align-top">
              <Label asSpan>{t("font_size_label")}</Label>
              <p className="text-sm text-muted-foreground">{fontSize}</p>
            </div>

            <Slider
              defaultValue={[fontSize * 100]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) =>
                dispatch(setContentFontSize(value[0] / 100))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label asSpan>{t("text_panel_text_alignment_label")}</Label>
            <div className="grid grid-cols-3 gap-4">
              {textAlignments.map(({ alignment, text }) => (
                <Button
                  key={alignment}
                  variant={"outline"}
                  size="sm"
                  onClick={() =>
                    dispatch(setContentFontTextAlignment(alignment))
                  }
                  className={`capitalize border-2 ${
                    fontTextAlignment === alignment ? "border-primary" : ""
                  }`}
                >
                  {text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
