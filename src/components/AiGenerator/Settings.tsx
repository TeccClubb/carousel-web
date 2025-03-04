import React, { FC, memo } from "react";
import { Switch } from "../ui";
import { LockIcon } from "@/icons";
import { useUserState } from "@/hooks/use-user-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useDispatch } from "react-redux";
import {
  toggleHideCounter,
  toggleHideIntroSlide,
  toggleHideOutroSlide,
  toggleShowWaterMark,
} from "@/store/carousels.slice";
import { toast } from "sonner";
import { Toast } from "../elements";
import { useRouter } from "@/i18n/navigation";
import { PRICING_PAGE_PATH } from "@/pathNames";
import { useTranslations } from "next-intl";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations();
  const { userData: user } = useUserState();

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
            label: t("view_pricing"),
            onClick: () => {
              router.push(PRICING_PAGE_PATH);
              toast.dismiss(toastId);
            },
          }}
        >
          <LockIcon />
          <div>
            {t("upgrade_to")} <b>{t("pro_plan")}</b> {t("to_remove_watermark")}
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
              label={t("show_watermark")}
              labelIcon={!user ? <LockIcon /> : undefined}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {t("show_watermark_message")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideIntroSlide}
            onCheckedChange={() => dispatch(toggleHideIntroSlide())}
            label={t("hide_intro_slide")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideOutroSlide}
            onCheckedChange={() => dispatch(toggleHideOutroSlide())}
            label={t("hide_outro_slide")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isHideCounter}
            onCheckedChange={() => dispatch(toggleHideCounter())}
            label={t("hide_counter")}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Settings);
