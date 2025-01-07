import React, { FC, useState } from "react";
import {
  Input,
  RadioButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui";
import { Arrow1, Arrow2 } from "@/icons/arrows";

const Swipe: FC = () => {
  const [isIntroSlideArrowEnabled, setIsIntroSlideArrowEnabled] =
    useState<boolean>(true);

  const [isRegularSlideArrowEnabled, setIsRegularSlideArrowEnabled] =
    useState<boolean>(false);

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Tabs defaultValue="text_and_arrow">
        <TabsList>
          <TabsTrigger value="text_and_arrow">Text & Arrow</TabsTrigger>
          <TabsTrigger value="arrow">Arrow</TabsTrigger>
        </TabsList>
        <TabsContent value="text_and_arrow" className="space-y-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <RadioButton
                checked={isIntroSlideArrowEnabled}
                setChecked={setIsIntroSlideArrowEnabled}
                label="Intro Slide Arrow"
              />
            </div>
            <Input type="text" placeholder="Intro Slide Arrow Text" />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <RadioButton
                checked={isRegularSlideArrowEnabled}
                setChecked={setIsRegularSlideArrowEnabled}
                label="Regular Slide Arrow"
              />
            </div>
            <Input type="text" placeholder="Regular Slide Arrow Text" />
          </div>
        </TabsContent>
        <TabsContent value="arrow">
          <div className="px-2 grid grid-cols-4 gap-x-1 gap-y-4">
            <div style={{ color: "rgb(0, 0, 0)" }}>
              <Arrow1 />
            </div>
            <div style={{ color: "rgb(0, 0, 0)" }}>
              <Arrow2 />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Swipe;
