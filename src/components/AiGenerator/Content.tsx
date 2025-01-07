import React, { FC, useState } from "react";
import { Input, RadioButton, Textarea } from "../ui";

const Content: FC = () => {
  const [isSubTitleActive, setIsSubTitleActive] = useState<boolean>(true);
  const [isTitleActive, setIsTitleActive] = useState<boolean>(true);
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(true);
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <RadioButton
              checked={isSubTitleActive}
              setChecked={setIsSubTitleActive}
              label="Sub Title"
            />
          </div>
          <Input type="text" placeholder="Enter your sub title" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <RadioButton
              checked={isTitleActive}
              setChecked={setIsTitleActive}
              label="Title"
            />
          </div>
          <Input type="text" placeholder="Enter your title" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <RadioButton
              checked={isDescriptionActive}
              setChecked={setIsDescriptionActive}
              label="Description"
            />
          </div>
          <Textarea placeholder="Enter your description" />
        </div>
      </div>
    </div>
  );
};

export default Content;
