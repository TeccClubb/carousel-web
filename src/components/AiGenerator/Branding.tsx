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
import { useUserState } from "@/hooks/use-user-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/hooks/use-sonner-toast";
import { setLoading } from "@/store/app.slice";
import {
  DEFAULT_BRAND_HANDLE,
  DEFAULT_BRAND_IMAGE_SRC,
  DEFAULT_BRAND_NAME,
} from "@/constant";

const Branding: FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
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
              label="Name"
            />
          </div>
          <Input
            value={brandName}
            onChange={(e) => dispatch(setBrandName(e.target.value))}
            type="text"
            placeholder={user !== null ? user.name : DEFAULT_BRAND_NAME}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={handle.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandHandle())}
              label="Handle"
            />
          </div>
          <Input
            value={brandHandle}
            onChange={(e) => dispatch(setBrandHandle(e.target.value))}
            type="text"
            placeholder={user !== null ? user.email : DEFAULT_BRAND_HANDLE}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={profileImage.isEnabled}
              onCheckedChange={() => dispatch(toggleBrandProfile())}
              label="Profile Picture"
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
            label="Show in Intro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInOutroSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInOutroSlide())}
            label="Show in Outro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInRegularSlide}
            onCheckedChange={() => dispatch(toggleBrandShowInRegularSlide())}
            label="Show in Regular Slides"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Branding);
