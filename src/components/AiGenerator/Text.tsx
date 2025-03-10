import React, { FC, memo } from "react";
import { Button, Combobox, ComboboxItem, Label, Slider, Switch } from "../ui";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import {
  setContentFontSize,
  setContentFontTextAlignment,
  setPrimaryFont,
  setSecondaryFont,
  setFontPair,
  toggleCustomFontsEnabled,
} from "@/store/carousels.slice";
import { useDispatch } from "react-redux";
import { googleFonts, fontPairs } from "@/assets/fonts";
import { useTranslations } from "next-intl";

const Text: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();

  const textAlignments: {
    alignment: "left" | "center" | "right";
    text: string;
  }[] = [
    { alignment: "left", text: "Left" },
    { alignment: "center", text: "Center" },
    { alignment: "right", text: "Right" },
  ];

  const {
    carousel: {
      data: {
        contentText: {
          isCustomFontsEnabled,
          primaryFont,
          secondaryFont,
          fontSize,
          fontTextAlignment,
        },
      },
    },
  } = useCarouselsState();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 pb-2">
            <Switch
              checked={isCustomFontsEnabled}
              onCheckedChange={() => dispatch(toggleCustomFontsEnabled())}
              label={t("use_custom_fonts")}
            />
          </div>

          {isCustomFontsEnabled && (
            <div className="space-y-4 p-2 border rounded-lg">
              <div className="flex flex-col space-y-1">
                <Combobox
                  label={t("primary_font")}
                  value={primaryFont.href}
                  text={primaryFont.name}
                  emptyMessage="No font found."
                  placeholder={t("select_primary_font")}
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
                  label={t("secondary_font")}
                  value={secondaryFont.href}
                  text={secondaryFont.name}
                  emptyMessage="No font found."
                  placeholder={t("select_secondary_font")}
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
            label={t("font_pair")}
            value={`${primaryFont.href} & ${secondaryFont.href}`}
            text={`${primaryFont.name} & ${secondaryFont.name}`}
            emptyMessage="No font found."
            placeholder={t("select_font_pair")}
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
              <Label asSpan>{t("font_size")}</Label>
              <p className="text-sm text-muted-foreground">{fontSize}</p>
            </div>

            <Slider
              value={[fontSize * 100]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) =>
                dispatch(setContentFontSize(value[0] / 100))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label asSpan>{t("text_alignment")}</Label>
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

export default memo(Text);
