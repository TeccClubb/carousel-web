import React, { FC } from "react";
import { Input, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "../ui";
import { getArrow } from "@/icons/arrows";
import {
  setArrowId,
  setIntroSlideArrowText,
  setRegularSlideArrowText,
  toggleArrowText,
  toggleIntroSlideArrow,
  toggleRegularSlideArrow,
} from "@/store";
import { useDispatch } from "react-redux";
import { useArrowText } from "@/hooks";
import { useTranslation } from "react-i18next";

const Swipe: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isOnlyArrow, introSlideArrow, regularSlideArrow } = useArrowText();

  const arrowIds = [
    "arrow_1",
    "arrow_2",
    "arrow_3",
    "arrow_4",
    "arrow_5",
    "arrow_6",
    "arrow_7",
    "arrow_8",
    "arrow_9",
    "arrow_10",
    "arrow_11",
    "arrow_12",
    "arrow_13",
    "arrow_14",
    "arrow_15",
    "arrow_16",
    "arrow_17",
    "arrow_18",
    "arrow_19",
    "arrow_20",
    "arrow_21",
    "arrow_22",
    "arrow_23",
    "arrow_24",
    "arrow_25",
    "arrow_26",
    "arrow_27",
    "arrow_28",
    "arrow_29",
    "arrow_30",
    "arrow_31",
  ];

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <Tabs
        defaultValue={!isOnlyArrow ? "text_and_arrow" : "arrow"}
        onValueChange={() => dispatch(toggleArrowText())}
      >
        <TabsList>
          <TabsTrigger value="text_and_arrow">
            {t("swipe_panel_text_and_arrow")}
          </TabsTrigger>
          <TabsTrigger value="arrow">{t("swipe_panel_arrow")}</TabsTrigger>
        </TabsList>
        <TabsContent value="text_and_arrow" className="space-y-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={introSlideArrow.isEnabled}
                onCheckedChange={() => dispatch(toggleIntroSlideArrow())}
                label={t("swipe_panel_switch_intro_slide_arrow_label")}
              />
            </div>
            <Input
              value={introSlideArrow.text}
              onChange={(e) =>
                dispatch(setIntroSlideArrowText(e.target.value.trim()))
              }
              type="text"
              placeholder={t(
                "swipe_panel_switch_intro_slide_arrow_placeholder"
              )}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={regularSlideArrow.isEnabled}
                onCheckedChange={() => dispatch(toggleRegularSlideArrow())}
                label={t("swipe_panel_switch_regular_slide_arrow_label")}
              />
            </div>
            <Input
              value={regularSlideArrow.text}
              onChange={(e) =>
                dispatch(setRegularSlideArrowText(e.target.value.trim()))
              }
              type="text"
              placeholder={t(
                "swipe_panel_switch_regular_slide_arrow_placeholder"
              )}
            />
          </div>
        </TabsContent>
        <TabsContent value="arrow">
          <div className="px-2 grid grid-cols-4 gap-x-1 gap-y-4">
            {arrowIds.map((arrowId) => (
              <div
                key={arrowId}
                style={{ color: "rgb(0, 0, 0)" }}
                onClick={() => dispatch(setArrowId(arrowId))}
              >
                {getArrow(arrowId)}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Swipe;
