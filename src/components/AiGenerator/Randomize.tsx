import React, { FC, memo } from "react";
import { Button } from "../ui";
import { Shuffle } from "lucide-react";
import { useDispatch } from "react-redux";
import { randomize } from "@/store/carousels.slice";

const Randomize: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Button
        onClick={() => dispatch(randomize())}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        size="sm"
      >
        <Shuffle className="h-5 w-5" />
        Randomize
      </Button>
    </div>
  );
};

export default memo(Randomize);
