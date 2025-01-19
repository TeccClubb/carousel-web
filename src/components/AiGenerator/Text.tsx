import React, { FC } from "react";
import { Button, Combobox, Label, Slider, Switch } from "../ui";
import { useContentText } from "@/hooks";
import {
  setContentFontSize,
  setContentFontTextAlignment,
  // setFontPair,
  setPrimaryFont,
  setSecondaryFont,
  toggleCustomFontsEnabled,
} from "@/store";
import { useDispatch } from "react-redux";
import { ComboboxOption } from "../ui/combobox";

const Text: FC = () => {
  const dispatch = useDispatch();

  const textAlignments: ("left" | "center" | "right")[] = [
    "left",
    "center",
    "right",
  ];

  const {
    primaryFont,
    secondaryFont,
    isCustomFontsEnabled,
    fontSize,
    fontTextAlignment,
  } = useContentText();

  // const fontPair = {
  //   label: `${primaryFont.label} & ${secondaryFont.label}`,
  //   value: `${primaryFont.value} & ${secondaryFont.value}`,
  // };

  const primaryFonts: ComboboxOption[] = [
    { value: "alegreya", label: "Alegreya" },
    { value: "arial", label: "Arial" },
    { value: "roboto", label: "Roboto" },
    { value: "times", label: "Times" },
    { value: "verdana", label: "Verdana" },
    { value: "georgia", label: "Georgia" },
    { value: "courier", label: "Courier" },
    { value: "helvetica", label: "Helvetica" },
    { value: "tahoma", label: "Tahoma" },
    { value: "trebuchet", label: "Trebuchet" },
    { value: "impact", label: "Impact" },
    { value: "comic-sans", label: "Comic Sans" },
  ];

  const secondaryFonts: ComboboxOption[] = [
    { value: "source Sans pro", label: "Source Sans Pro" },
    { value: "roboto", label: "Roboto" },
    { value: "times", label: "Times" },
    { value: "verdana", label: "Verdana" },
    { value: "georgia", label: "Georgia" },
    { value: "courier", label: "Courier" },
    { value: "helvetica", label: "Helvetica" },
    { value: "tahoma", label: "Tahoma" },
    { value: "trebuchet", label: "Trebuchet" },
    { value: "impact", label: "Impact" },
    { value: "comic-sans", label: "Comic Sans" },
  ];

  // const fontPairs = primaryFonts.map((primaryFont, index) => {
  //   const secondaryFont = secondaryFonts[index];
  //   return {
  //     value: `${primaryFont.value} & ${secondaryFont.value}`,
  //     label: `${primaryFont.label} & ${secondaryFont.label}`,
  //   };
  // });

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
                  options={primaryFonts}
                  label={"Primary Font"}
                  value={primaryFont.value!}
                  onSelect={(_, object) =>
                    dispatch(
                      setPrimaryFont({
                        value: object.value,
                        label: object.label,
                      })
                    )
                  }
                  emptyMessage="No font found."
                  placeholder="Select Primary Font"
                  className="w-full"
                  itemClassName="w-72"
                  size="sm"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Combobox
                  options={secondaryFonts}
                  label={"Secondary Font"}
                  value={secondaryFont.value}
                  onSelect={(_, object) =>
                    dispatch(
                      setSecondaryFont({
                        value: object.value,
                        label: object.label,
                      })
                    )
                  }
                  emptyMessage="No font found."
                  placeholder="Select Secondary Font"
                  className="w-full"
                  itemClassName="w-72"
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-1">
                <Combobox
                  options={primaryFonts}
                  label={"Primary Font"}
                  value={primaryFont.value!}
                  onSelect={(_, object) =>
                    dispatch(
                      setPrimaryFont({
                        value: object.value,
                        label: object.label,
                      })
                    )
                  }
                  emptyMessage="No font found."
                  placeholder="Select Primary Font"
                  className="w-full"
                  itemClassName="w-72"
                  size="sm"
                />
              </div>

        {/* <div className="flex flex-col space-y-1">
          <Combobox
            options={fontPairs}
            label={"Font Pair"}
            value={fontPair.value}
            onSelect={(_, object) => {
              const [primaryFontLabel, secondaryFontLabel] =
                object.label.split(" & ");
              const [primaryFontValue, secondaryFontValue] =
                object.value.split(" & ");

              dispatch(
                setFontPair({
                  primaryFont: {
                    value: primaryFontValue,
                    label: primaryFontLabel,
                  },
                  secondaryFont: {
                    value: secondaryFontValue,
                    label: secondaryFontLabel,
                  },
                })
              );
            }}
            emptyMessage="No font found."
            placeholder="Select Font Pair"
            className="w-full"
            itemClassName="w-72"
            size="sm"
          />
        </div> */}

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
