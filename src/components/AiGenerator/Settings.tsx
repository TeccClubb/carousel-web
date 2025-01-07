import React, { FC, useState } from "react";
import { RadioButton } from "../ui";
import { LockIcon } from "@/icons";

const Settings: FC = () => {
  const [isShowWaterMark, setIsShowWaterMark] = useState<boolean>(true);
  const [isHideIntroSlide, setIsHideIntroSlide] = useState<boolean>(false);
  const [isHideOutroSlide, setIsHideOutroSlide] = useState<boolean>(false);
  const [isHideCounter, setIsHideCounter] = useState<boolean>(false);

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <RadioButton
              checked={isShowWaterMark}
              setChecked={setIsShowWaterMark}
              label="Show Watermark"
              labelIcon={<LockIcon />}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Show watermark and give credit to support our tool.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <RadioButton
            checked={isHideIntroSlide}
            setChecked={setIsHideIntroSlide}
            label="Hide Intro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <RadioButton
            checked={isHideOutroSlide}
            setChecked={setIsHideOutroSlide}
            label="Hide Outro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <RadioButton
            checked={isHideCounter}
            setChecked={setIsHideCounter}
            label="Hide Counter"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
