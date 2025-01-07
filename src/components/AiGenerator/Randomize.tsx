import { ArrowsShuffleIcon } from "@/icons";
import React, { FC } from "react";
import { Button } from "../ui";

const Randomize: FC = () => {
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Button
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        size="sm"
      >
        <ArrowsShuffleIcon />
        Randomize
      </Button>
    </div>
  );
};

export default Randomize;
