import React, { FC } from "react";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
} from "../ui";
import { ChevronsUpDownIcon } from "@/icons";
import { useContentText } from "@/hooks";
import { setContentFontSize, setContentFontTextAlignment, toggleCustomFontsEnabled } from "@/store";
import { useDispatch } from "react-redux";

const Text: FC = () => {
  const dispatch = useDispatch();

  const textAlignments: ("left" | "center" | "right")[] = [
    "left",
    "center",
    "right",
  ];

  // const { primaryFont, secondaryFont, fontSize, fontTextAlignment } =
  const { isCustomFontsEnabled, fontSize, fontTextAlignment } = useContentText();

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
              <div>
                <Select
                //   value={selectedLanguage}
                //   onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger label="Primary Font" className="gap-1">
                    <SelectValue placeholder="Primary Font" />
                    <ChevronsUpDownIcon className="dark:text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="en">Primary Font 1</SelectItem>
                      <SelectItem value="sp">Primary Font 2</SelectItem>
                      <SelectItem value="fr">Primary Font 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                //   value={selectedLanguage}
                //   onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger label="Secondary Font" className="gap-1">
                    <SelectValue placeholder="Secondary Font" />
                    <ChevronsUpDownIcon className="dark:text-white" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="en">Secondary Font 1</SelectItem>
                      <SelectItem value="sp">Secondary Font 2</SelectItem>
                      <SelectItem value="fr">Secondary Font 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div>
          <Select
          //   value={selectedLanguage}
          //   onValueChange={setSelectedLanguage}
          >
            <SelectTrigger label="Font Pair" className="gap-1">
              <SelectValue placeholder="Font Pair" />
              <ChevronsUpDownIcon className="dark:text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">Font 1</SelectItem>
                <SelectItem value="sp">Font 2</SelectItem>
                <SelectItem value="fr">Font 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
