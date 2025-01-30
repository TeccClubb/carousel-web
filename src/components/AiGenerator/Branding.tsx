import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage, Input, Switch } from "../ui";
import { useDispatch } from "react-redux";
import { useBrand, useUserData } from "@/hooks";
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
} from "@/store";
import { useTranslation } from "react-i18next";

const Branding: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    isShowInIntroSlide,
    isShowInOutroSlide,
    isShowInRegularSlide,
    name,
    handle,
    profileImage,
  } = useBrand();

  const userData = useUserData();

  const brandName = userData === null ? "John Doe" : name.text ?? userData.name;
  const brandHandle =
    userData === null ? "@pixmart" : handle.text ?? userData.email;
  const brandImageSrc =
    userData === null ? "/john.jpg" : profileImage.src || userData.picture;

  const handleImageChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file

    if (file && file.type.startsWith("image/")) {
      const fileURL = URL.createObjectURL(file);

      dispatch(setBrandProfileSrc(fileURL));
    } else {
      alert("Please select a valid image file.");
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
              userData !== null
                ? userData.name
                : t("branding_panel_switch_name_label")
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
              userData !== null
                ? userData.email
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

export default Branding;
