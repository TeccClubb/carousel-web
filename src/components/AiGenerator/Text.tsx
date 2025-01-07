import React, { FC, useState } from "react";
import {
  Button,
  Label,
  RadioButton,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from "../ui";
import { ChevronsUpDownIcon } from "@/icons";

const Text: FC = () => {
  const [isCustomFontsEnabled, setIsCustomFontsEnabled] =
    useState<boolean>(false);

  const textAlignments = ["Left", "Center", "Right"];

  const [activeTextAlignment, setActiveTextAlignment] = useState("Left");

  const [fontSize, setFontSize] = useState<number>(0.8)

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 pb-2">
            <RadioButton
              checked={isCustomFontsEnabled}
              setChecked={setIsCustomFontsEnabled}
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
              <Label>Font Size</Label>
              <p className="text-sm text-muted-foreground">{(fontSize)}</p>
            </div>

            <Slider defaultValue={[fontSize * 100]} min={10} max={100} step={5} onValueChange={(value)=>setFontSize(value[0] / 100)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Text Alignment</Label>
            <div className="grid grid-cols-3 gap-4">
              {textAlignments.map((textAlignment) => (
                <Button
                  key={textAlignment}
                  variant={"outline"}
                  size="sm"
                  onClick={()=>setActiveTextAlignment(textAlignment)}
                  className={`border-2 ${
                    activeTextAlignment === textAlignment
                      ? "border-primary"
                      : ""
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
