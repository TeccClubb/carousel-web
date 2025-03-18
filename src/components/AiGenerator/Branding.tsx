import React, { FC, memo } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ImageInput,
  Input,
  Switch,
} from "../ui";
import { useDispatch } from "react-redux";
import {
  setBrandHandle,
  setBrandName,
  setBrandProfileSrc,
  toggleBrandHandle,
  toggleBrandName,
  toggleBrandProfile,
  toggleBrandShowInIntroSlide,
  toggleBrandShowInOutroSlide,
  toggleBrandShowInRegularSlide,
} from "@/store/carousels.slice";
import { useUserCookie } from "@/hooks/use-cookie";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import {
  DEFAULT_BRAND_HANDLE,
  DEFAULT_BRAND_IMAGE_SRC,
  DEFAULT_BRAND_NAME,
} from "@/constant";
import { useTranslations } from "next-intl";
import { useAppState } from "@/hooks/use-app-state";

const Branding: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const {
    carousel: {
      data: {
        brand: {
          isShowInIntroSlide,
          isShowInOutroSlide,
          isShowInRegularSlide,
          name,
          handle,
          profileImage,
        },
      },
    },
  } = useCarouselsState();

  const { isClient } = useAppState();
  const { user } = useUserCookie();

  const brandName =
    user === null ? name.text ?? DEFAULT_BRAND_NAME : name.text ?? user.name;
  const brandHandle =
    user === null
      ? handle.text ?? DEFAULT_BRAND_HANDLE
      : handle.text ?? user.email;
  const brandImageSrc =
    user === null
      ? profileImage.src || DEFAULT_BRAND_IMAGE_SRC
      : profileImage.src || user.avatar;

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={name.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandName())}
              label={t("name")}
            />
          </div>
          {isClient && (
            <Input
              value={brandName}
              onChange={(e) => dispatch(setBrandName(e.target.value))}
              type="text"
              placeholder={user !== null ? user.name : DEFAULT_BRAND_NAME}
            />
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={handle.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandHandle())}
              label={t("handle")}
            />
          </div>
          {isClient && (
            <Input
              value={brandHandle}
              onChange={(e) => dispatch(setBrandHandle(e.target.value))}
              type="text"
              placeholder={user !== null ? user.email : DEFAULT_BRAND_HANDLE}
            />
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={profileImage.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandProfile())}
              label={t("profile_picture")}
            />
          </div>
          {isClient && (
            <>
              <ImageInput
                id="brand_image_input"
                oldImageUrl={brandImageSrc}
                onImageSelect={(imageSrc) =>
                  dispatch(setBrandProfileSrc(imageSrc))
                }
              />
              <Avatar className="size-16 transition-all hover:scale-105">
                <label htmlFor="brand_image_input">
                  <AvatarImage src={brandImageSrc} />
                </label>
                <AvatarFallback>{brandName}</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInIntroSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInIntroSlide())}
            label={t("show_in_intro_slide")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInOutroSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInOutroSlide())}
            label={t("show_in_outro_slide")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInRegularSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInRegularSlide())}
            label={t("show_in_regular_slide")}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Branding);
