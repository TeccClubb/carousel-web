import React, { FC } from "react";
import { BackgroundIcon } from "@/icons";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui";

const SlideHeader: FC<{
  handleChangeBackground: () => void;
  handleAddSlide: () => void;
  handleDeleteSlide: () => void;
}> = ({ handleChangeBackground, handleAddSlide, handleDeleteSlide }) => {
  return (
    <div className="py-1 flex justify-between">
      <Button
        variant="outline"
        size="icon"
        onClick={handleChangeBackground}
        className="border-none bg-transparent"
      >
        <BackgroundIcon size={4} />
      </Button>
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleAddSlide}
          className="border-none bg-transparent"
        >
          <PlusCircleIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleDeleteSlide}
          className="border-none bg-transparent"
        >
          <Trash2Icon className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default SlideHeader;
