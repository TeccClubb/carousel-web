import React, { FC } from "react";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { Shuffle } from "lucide-react";

const Randomize: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Button
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        size="sm"
      >
        <Shuffle className="h-5 w-5" />
        {t("randomize_panel_btn_text")}
      </Button>
    </div>
  );
};

export default Randomize;
