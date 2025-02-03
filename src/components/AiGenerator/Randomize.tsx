import React, { FC, useEffect } from "react";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { Shuffle } from "lucide-react";
import { useDispatch } from "react-redux";
import { randomize } from "@/store";
import { fontPairs } from "@/assets/fonts";
import { darkColors, lightColors } from "@/assets/slide-colors";
import { useContentText } from "@/hooks";

const Randomize: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleRandomize = () => {
    const randomFontPairIndex = Math.floor(Math.random() * fontPairs.length);
    const fontPair = fontPairs[randomFontPairIndex];

    const colorsGroup = [...darkColors, ...lightColors];
    const randomColorsIndex = Math.floor(Math.random() * colorsGroup.length);
    const colors = colorsGroup[randomColorsIndex];

    const randomIsAlternateColorsIndex = Math.floor(Math.random() * 2);

    const randomBackgroundIdIndex = Math.floor(Math.random() * 24);

    const randomCornerElementIndex = Math.floor(Math.random() * 4);

    dispatch(
      randomize({
        primaryFont: fontPair.primaryFont,
        secondaryFont: fontPair.secondaryFont,
        backgroundColor: colors.backgroundColor,
        textColor: colors.textColor,
        accentColor: colors.accentColor,
        isAlternateSlideColors: [true, false][randomIsAlternateColorsIndex],
        backgroundId: `background_${randomBackgroundIdIndex}`,
        cornerElementId: `element_${randomCornerElementIndex}`,
      })
    );
  };

  const { primaryFont, secondaryFont } = useContentText();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = primaryFont.href;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [primaryFont.href]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = secondaryFont.href;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [secondaryFont.href]);

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Button
        onClick={handleRandomize}
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
