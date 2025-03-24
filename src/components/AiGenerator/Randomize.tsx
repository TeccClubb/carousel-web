import React, { FC, memo } from "react";
import { Button } from "../ui/button";
import { Shuffle } from "lucide-react";
import { useDispatch } from "react-redux";
import { randomize } from "@/store/carousels.slice";
import { useTranslations } from "next-intl";

const Randomize: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Button
        onClick={() => dispatch(randomize())}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        size="sm"
      >
        <Shuffle className="h-5 w-5" />
        {t("randomize")}
      </Button>
    </div>
  );
};

export default memo(Randomize);
