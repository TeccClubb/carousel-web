import React, { FC, useState } from "react";
import { Switch } from "../ui";
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
            <Switch
              checked={isShowWaterMark}
              onCheckedChange={(value) => setIsShowWaterMark(value)}
              label="Show Watermark"
              labelIcon={<LockIcon />}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Show watermark and give credit to support our tool.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideIntroSlide}
            onCheckedChange={(value) => setIsHideIntroSlide(value)}
            label="Hide Intro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideOutroSlide}
            onCheckedChange={(value) => setIsHideOutroSlide(value)}
            label="Hide Outro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideCounter}
            onCheckedChange={(value) => setIsHideCounter(value)}
            label="Hide Counter"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
