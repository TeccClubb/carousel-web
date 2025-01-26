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

const Text: FC = () => {
  const dispatch = useDispatch();

  const textAlignments: ("left" | "center" | "right")[] = [
    "left",
    "center",
    "right",
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
              label="Use Custom Fonts"
            />
          </div>

          {isCustomFontsEnabled && (
            <div className="space-y-4 p-2 border rounded-lg">
              <div className="flex flex-col space-y-1">
                <Combobox
                  label={"Primary Font"}
                  value={primaryFont.href}
                  text={primaryFont.name}
                  emptyMessage="No font found."
                  placeholder="Select Primary Font"
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
                  label={"Secondary Font"}
                  value={secondaryFont.href}
                  text={secondaryFont.name}
                  emptyMessage="No font found."
                  placeholder="Select Secondary Font"
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
            label={"Font Pair"}
            value={`${primaryFont.href} & ${secondaryFont.href}`}
            text={`${primaryFont.name} & ${secondaryFont.name}`}
            emptyMessage="No font found."
            placeholder="Select Font Pair"
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
              <Label asSpan>Font Size</Label>
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
            <Label asSpan>Text Alignment</Label>
            <div className="grid grid-cols-3 gap-4">
              {textAlignments.map((textAlignment) => (
                <Button
                  key={textAlignment}
                  variant={"outline"}
                  size="sm"
                  onClick={() =>
                    dispatch(setContentFontTextAlignment(textAlignment))
                  }
                  className={`capitalize border-2 ${
                    fontTextAlignment === textAlignment ? "border-primary" : ""
                  }`}
                >
                  {textAlignment}
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
