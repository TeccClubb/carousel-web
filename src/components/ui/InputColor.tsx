import React, { Dispatch, FC, SetStateAction, useId } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { HexColorPicker } from "react-colorful";

const InputColor: FC<{
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  label: string;
}> = ({ color, setColor, label }) => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <div className="w-[120px] relative">
        <Input
          id={id}
          placeholder={label}
          value={color}
          onChange={(e) => setColor(e.target.value.trim())}
          style={{ paddingLeft: "36px" }}
        />

        <Popover>
          <PopoverTrigger className="absolute left-[10px] top-[6px]">
            <span
              style={{ background: color }}
              className="mr-1 flex h-6 w-6 shrink-0 -translate-x-1 items-center justify-center rounded-full cursor-pointer hover:border hover:border-gray-300 hover:shadow-sm"
            />
          </PopoverTrigger>
          <PopoverContent>
            <HexColorPicker color={color} onChange={setColor} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export { InputColor };
