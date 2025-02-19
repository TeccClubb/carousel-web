import React, { FC, memo } from "react";
import { Switch } from "../ui";
import { LockIcon } from "@/icons";
import { useUserState } from "@/hooks/use-user-state";
import { useAppState } from "@/hooks/use-app-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useDispatch } from "react-redux";
import {
  toggleHideCounter,
  toggleHideIntroSlide,
  toggleHideOutroSlide,
  toggleShowWaterMark,
} from "@/store/carousels.slice";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Toast } from "../elements";
import { useRouter } from "next/navigation";
import { PRICING_PAGE_PATH } from "@/pathNames";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const { userData: user } = useUserState();
  const { locale } = useAppState();

  const {
    carousel: {
      data: {
        settings: {
          isShowWaterMark,
          isHideIntroSlide,
          isHideOutroSlide,
          isHideCounter,
        },
      },
    },
  } = useCarouselsState();

  const handleToggleShowWatermark = () => {
    if (!user) {
      const toastId = toast(
        <Toast
          action={{
            label: "View Pricing",
            onClick: () => {
              router.push(`/${locale}${PRICING_PAGE_PATH}`);
              toast.dismiss(toastId);
            },
          }}
        >
          <LockIcon />
          <div>
            Upgrade to <b>Pro plan</b> to remove watermark.
          </div>
        </Toast>
      );
    } else {
      dispatch(toggleShowWaterMark());
    }
  };

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isShowWaterMark}
              onCheckedChange={handleToggleShowWatermark}
              label={t("settings_panel_switch_watermark_label")}
              labelIcon={!user ? <LockIcon /> : undefined}
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

export default memo(Settings);
