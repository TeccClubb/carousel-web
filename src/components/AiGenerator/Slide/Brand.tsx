"use client";
import React, { FC, memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { useUserState } from "@/hooks/use-user-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import {
  DEFAULT_BRAND_HANDLE,
  DEFAULT_BRAND_IMAGE_SRC,
  DEFAULT_BRAND_NAME,
} from "@/constant";

const Brand: FC<{ color: string }> = ({ color }) => {
  const {
    carousel: {
      data: {
        brand: { name, handle, profileImage },
      },
    },
  } = useCarouselsState();
  const { userData: user } = useUserState();

  const brandName =
    user === null ? name.text || DEFAULT_BRAND_NAME : name.text || user.name;
  const brandHandle =
    user === null
      ? handle.text || DEFAULT_BRAND_HANDLE
      : handle.text || user.email;
  const brandImageSrc =
    user === null
      ? profileImage.src || DEFAULT_BRAND_IMAGE_SRC
      : profileImage.src || user.avatar;

  return (
    <div
      className="flex items-center h-[5.625em] absolute left-[3.75em] bottom-[3.75em] z-50"
      style={{ color }}
    >
      <div className="flex items-center justify-center">
        {profileImage.isEnabled && (
          <Avatar className="w-[6em] h-[6em] mr-[1em] shrink-0">
            <AvatarImage src={brandImageSrc} />
            <AvatarFallback>{brandName}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col items-start justify-center relative z-[1]">
          {name.isEnabled && (
            <div className="text-[2em] font-semibold leading-[1.1]">
              {brandName}
            </div>
          )}
          {handle.isEnabled && (
            <div className="text-[1.75em] font-normal opacity-90">
              {brandHandle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Brand);
