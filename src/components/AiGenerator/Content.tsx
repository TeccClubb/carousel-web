import React, { FC, useState } from "react";
import { Input, Switch, Textarea } from "../ui";

const Content: FC = () => {
  const [isSubTitleActive, setIsSubTitleActive] = useState<boolean>(true);
  const [isTitleActive, setIsTitleActive] = useState<boolean>(true);
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(true);
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isSubTitleActive}
              onCheckedChange={(value) => setIsSubTitleActive(value)}
              label="Sub Title"
            />
          </div>
          <Input type="text" placeholder="Enter your sub title" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isTitleActive}
              onCheckedChange={(value) => setIsTitleActive(value)}
              label="Title"
            />
          </div>
          <Input type="text" placeholder="Enter your title" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isDescriptionActive}
              onCheckedChange={(value) => setIsDescriptionActive(value)}
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
