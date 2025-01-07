import React, { FC, useState } from "react";
import { Input, RadioButton } from "../ui";
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
            <RadioButton
              checked={isNameEnabled}
              setChecked={setIsNameEnabled}
              label="Name"
            />
          </div>
          <Input type="text" placeholder="Name" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <RadioButton
              checked={isHandleEnabled}
              setChecked={setIsHandleEnabled}
              label="Handle"
            />
          </div>
          <Input type="text" placeholder="Handle" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <RadioButton
              checked={isProfilePicEnabled}
              setChecked={setIsProfilePicEnabled}
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
          <RadioButton
            checked={isShowInIntroSlide}
            setChecked={setIsShowInIntroSlide}
            label="Show in Intro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <RadioButton
            checked={isShowInOutroSlide}
            setChecked={setIsShowInOutroSlide}
            label="Show in Outro Slide"
          />
        </div>

        <div className="flex items-center gap-2">
          <RadioButton
            checked={isShowInRegularSlide}
            setChecked={setIsShowInRegularSlide}
            label="Show in Regular Slides"
          />
        </div>
      </div>
    </div>
  );
};

export default Branding;
