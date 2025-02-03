"use client";
import React, { FC, memo } from "react";
import { useBrand, useUserData } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

const Brand: FC<{ color: string }> = ({ color }) => {
  const { name, handle, profileImage } = useBrand();
  const userData = useUserData();

  const brandName = userData === null ? "John Doe" : name.text || userData.name;
  const brandHandle =
    userData === null ? "Pixmart" : handle.text || userData.email;
  const brandImageSrc =
    userData === null ? "/john.jpg" : profileImage.src || userData.picture;

  return (
    <div
      className="flex items-center h-[5.625em] absolute left-[3.75em] bottom-[3.75em] z-50"
      style={{ color }}
    >
      <div className="flex items-center justify-center">
        {profileImage.isEnabled && (
          <span className="w-[6em] h-[6em] mr-[1em] rounded-[5em] shrink-0">
            <Avatar className="size-9">
              <AvatarImage src={brandImageSrc} />
              <AvatarFallback>{brandName}</AvatarFallback>
            </Avatar>
          </span>
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
