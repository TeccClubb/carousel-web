import React, { FC } from "react";
import { Switch } from "../ui";
import { LockIcon } from "@/icons";
import { useSettings } from "@/hooks";
import { useDispatch } from "react-redux";
import { toggleHideCounter, toggleHideIntroSlide, toggleHideOutroSlide, toggleShowWaterMark } from "@/store";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const {isShowWaterMark, isHideIntroSlide, isHideOutroSlide, isHideCounter} = useSettings();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isShowWaterMark}
              onCheckedChange={() => dispatch(toggleShowWaterMark())}
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
            onCheckedChange={() => dispatch(toggleHideIntroSlide())}
            label="Hide Intro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideOutroSlide}
            onCheckedChange={() => dispatch(toggleHideOutroSlide())}
            label="Hide Outro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideCounter}
            onCheckedChange={() => dispatch(toggleHideCounter())}
            label="Hide Counter"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
