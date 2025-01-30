import React, { FC } from "react";
import { Switch } from "../ui";
import { LockIcon } from "@/icons";
import { useSettings } from "@/hooks";
import { useDispatch } from "react-redux";
import {
  toggleHideCounter,
  toggleHideIntroSlide,
  toggleHideOutroSlide,
  toggleShowWaterMark,
} from "@/store";
import { useTranslation } from "react-i18next";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isShowWaterMark, isHideIntroSlide, isHideOutroSlide, isHideCounter } =
    useSettings();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isShowWaterMark}
              onCheckedChange={() => dispatch(toggleShowWaterMark())}
              label={t("settings_panel_switch_watermark_label")}
              labelIcon={<LockIcon />}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {t("settings_panel_watermark_message")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideIntroSlide}
            onCheckedChange={() => dispatch(toggleHideIntroSlide())}
            label={t("settings_panel_switch_hide_intro_slide_label")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideOutroSlide}
            onCheckedChange={() => dispatch(toggleHideOutroSlide())}
            label={t("settings_panel_switch_hide_outro_slide_label")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideCounter}
            onCheckedChange={() => dispatch(toggleHideCounter())}
            label={t("settings_panel_switch_hide_counter_label")}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
