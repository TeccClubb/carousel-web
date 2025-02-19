import React, { FC, memo } from "react";
import { Avatar, AvatarFallback, AvatarImage, Input, Switch } from "../ui";
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
import { useTranslation } from "react-i18next";
import { useUserState } from "@/hooks/use-user-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/hooks/use-sonner-toast";
import { setLoading } from "@/store/app.slice";

const Branding: FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();
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

  const { userData: user } = useUserState();

  const brandName = user === null ? "John Doe" : name.text ?? user.name;
  const brandHandle = user === null ? "https://carouselbuilder.io" : handle.text ?? user.email;
  const brandImageSrc =
    user === null ? "/john.jpg" : profileImage.src || user.avatar;

  const loadingSetter = ({
    isLoading,
    title,
  }: {
    isLoading: boolean;
    title?: string;
  }) => {
    dispatch(setLoading({ isLoading, title }));
  };

  const onError = (message: string) => toast.error(message);

  const handleImageChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg"
      ) {
        uploadImage({
          oldUrl: brandImageSrc,
          file,
          loadingSetter,
          onError,
          onImageSelect: (imageSrc) => {
            dispatch(setBrandProfileSrc(imageSrc));
          },
        });
      } else {
        toast.error("Please select an image in jpeg, png, or jpg formats.");
      }
    }
  };

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={name.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandName())}
              label={t("branding_panel_switch_name_label")}
            />
          </div>
          <Input
            value={brandName}
            onChange={(e) => dispatch(setBrandName(e.target.value.trim()))}
            type="text"
            placeholder={
              user !== null ? user.name : t("branding_panel_switch_name_label")
            }
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={handle.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandHandle())}
              label={t("branding_panel_switch_handle_label")}
            />
          </div>
          <Input
            value={brandHandle}
            onChange={(e) => dispatch(setBrandHandle(e.target.value.trim()))}
            type="text"
            placeholder={
              user !== null
                ? user.email
                : t("branding_panel_switch_handle_label")
            }
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={profileImage.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandProfile())}
              label={t("branding_panel_switch_image_label")}
            />
          </div>
          <Input onChange={handleImageChoose} type="file" accept="image/*" />

          <Avatar className="size-16 transition-all hover:scale-105">
            <AvatarImage src={brandImageSrc} />
            <AvatarFallback>{brandName}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInIntroSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInIntroSlide())}
            label={t("branding_panel_switch_intro_slide_label")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInOutroSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInOutroSlide())}
            label={t("branding_panel_switch_outro_slide_label")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInRegularSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInRegularSlide())}
            label={t("branding_panel_switch_regular_slide_label")}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Branding);
