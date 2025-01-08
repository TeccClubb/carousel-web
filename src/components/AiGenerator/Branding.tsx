import React, { FC, useState } from "react";
import { Input, Switch } from "../ui";
import Image from "next/image";

const Branding: FC = () => {
  const [isNameEnabled, setIsNameEnabled] = useState<boolean>(true);
  const [isHandleEnabled, setIsHandleEnabled] = useState<boolean>(true);
  const [isProfilePicEnabled, setIsProfilePicEnabled] = useState<boolean>(true);
  const [isShowInIntroSlide, setIsShowInIntroSlide] = useState<boolean>(true);
  const [isShowInOutroSlide, setIsShowInOutroSlide] = useState<boolean>(true);
  const [isShowInRegularSlide, setIsShowInRegularSlide] =
    useState<boolean>(true);

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isNameEnabled}
              onCheckedChange={(value) => setIsNameEnabled(value)}
              label="Name"
            />
          </div>
          <Input type="text" placeholder="Name" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isHandleEnabled}
              onCheckedChange={(value) => setIsHandleEnabled(value)}
              label="Handle"
            />
          </div>
          <Input type="text" placeholder="Handle" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isProfilePicEnabled}
              onCheckedChange={(value) => setIsProfilePicEnabled(value)}
              label="Profile Picture"
            />
          </div>
          <Input type="file" />

          <Image
            src="/john.jpg"
            alt="Image not founded"
            width={64}
            height={64}
            sizes="100vw"
            priority
            className="rounded-full h-auto w-auto object-cover transition-all hover:scale-105 aspect-square border"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInIntroSlide}
            onCheckedChange={(value) => setIsShowInIntroSlide(value)}
            label="Show in Intro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInOutroSlide}
            onCheckedChange={(value) => setIsShowInOutroSlide(value)}
            label="Show in Outro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isShowInRegularSlide}
            onCheckedChange={(value) => setIsShowInRegularSlide(value)}
            label="Show in Regular Slides"
          />
        </div>
      </div>
    </div>
  );
};

export default Branding;
