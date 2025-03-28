import React, { FC, memo, ReactNode } from "react";
import { Button } from "../ui/button";
import { ImageInput, Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useDispatch } from "react-redux";
import {
  setSlideTitle,
  toggleSlideSubTitle,
  setSlideSubTitle,
  toggleSlideTitle,
  setSlideDescription,
  toggleSlideDescription,
  setSlideCTAText,
  toggleSlideCTAButton,
  setSlideImageSrc,
  toggleSlideImage,
  setSlideDescriptionFontSize,
  setSlideTitleFontSize,
  setSlideImageOpacity,
  setSlideImageBackgroundPosition,
  toggleSlideImageBackgroundCover,
  setContentOrientation,
  setContentSelectedTab,
} from "@/store/carousels.slice";
import {
  Maximize2Icon,
  Minimize2Icon,
  RefreshCcwIcon,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import {
  HorizontalIcon,
  HorizontalReverseIcon,
  VerticalIcon,
  VerticalReverseIcon,
} from "@/icons";
import { useTranslations } from "next-intl";
import { imageBackgroundPositions } from "@/assets/imageBackgroundPositions";

const FontSizeSlider: FC<{
  fontSize: number;
  setFontSize: (value: number) => void;
  onResetClick: () => void;
  toolTipText: string;
}> = memo(({ fontSize, setFontSize, onResetClick, toolTipText }) => {
  const t = useTranslations();
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7 border-none bg-transparent"
              >
                <SettingsIcon />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <span>{toolTipText}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between align-top">
            <div className="flex items-center gap-2">
              <Label asSpan className="text-xs">
                {t("font_size")}
              </Label>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <RefreshCcwIcon
                      onClick={onResetClick}
                      className="h-3 w-3 cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span>{t("reset_slider")}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xs text-muted-foreground">{fontSize}%</p>
          </div>
          <Slider
            value={[fontSize]}
            min={10}
            max={200}
            step={5}
            onValueChange={(value) => setFontSize(value[0])}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
});

FontSizeSlider.displayName = "FontSizeSlider";

const TextSettings: FC = memo(() => {
  const dispatch = useDispatch();
  const t = useTranslations();

  const {
    currentIndex,
    carousel: {
      data: { slides },
    },
  } = useCarouselsState();

  const {
    subTitle: { text: subTitle = "", isEnabled: isSubTitleEnabled },
    title: {
      text: title = "",
      isEnabled: isTitleEnabled,
      fontSize: titleFontSize = 100,
    },
    description: {
      text: description = "",
      isEnabled: isDescriptionEnabled,
      fontSize: descriptionFontSize = 100,
    },
  } = slides[currentIndex];

  return (
    <>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={isSubTitleEnabled}
            onCheckedChange={() => dispatch(toggleSlideSubTitle())}
            label={t("sub_title")}
          />
        </div>
        <Input
          value={subTitle}
          onChange={(e) => dispatch(setSlideSubTitle(e.target.value.trim()))}
          type="text"
          placeholder={t("enter_your_sub_title")}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Switch
              checked={isTitleEnabled}
              onCheckedChange={() => dispatch(toggleSlideTitle())}
              label={t("title")}
            />
          </div>
          <FontSizeSlider
            toolTipText={t("title_settings")}
            fontSize={titleFontSize}
            onResetClick={() => dispatch(setSlideTitleFontSize(100))}
            setFontSize={(value) => dispatch(setSlideTitleFontSize(value))}
          />
        </div>

        <Input
          value={title}
          onChange={(e) => dispatch(setSlideTitle(e.target.value.trim()))}
          type="text"
          placeholder={t("enter_your_title")}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Switch
              checked={isDescriptionEnabled}
              onCheckedChange={() => dispatch(toggleSlideDescription())}
              label={t("description")}
            />
          </div>
          <FontSizeSlider
            toolTipText={t("description_settings")}
            fontSize={descriptionFontSize}
            onResetClick={() => dispatch(setSlideDescriptionFontSize(100))}
            setFontSize={(value) =>
              dispatch(setSlideDescriptionFontSize(value))
            }
          />
        </div>
        <Textarea
          value={description}
          rows={5}
          onChange={(e) => dispatch(setSlideDescription(e.target.value.trim()))}
          placeholder={t("enter_your_description")}
        />
      </div>
    </>
  );
});

TextSettings.displayName = "TextSettings";

const ImageSettings: FC = memo(() => {
  const dispatch = useDispatch();
  const t = useTranslations();

  const {
    currentIndex,
    carousel: {
      data: { slides },
    },
  } = useCarouselsState();

  const {
    contentOrientation = "column",
    image: {
      src: imageSrc = "",
      isEnabled: isImageEnabled,
      opacity: imageOpacity = 100,
      backgroundPosition: imageBackgroundPosition = "center center",
      isBgCover: isImageBackgroundCover = true,
    },
  } = slides[currentIndex];

  const flexDirections: {
    value: "row" | "row-reverse" | "column" | "column-reverse";
    icon: ReactNode;
  }[] = [
    { value: "column", icon: <HorizontalIcon /> },
    { value: "row", icon: <VerticalIcon /> },
    { value: "column-reverse", icon: <HorizontalReverseIcon /> },
    { value: "row-reverse", icon: <VerticalReverseIcon /> },
  ];

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4 pb-8">
      <legend className="-ml-1 px-1 text-sm font-medium">
        <h3 className="font-semibold leading-none tracking-tight">
          {t("slide_image")}
        </h3>
      </legend>

      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={isImageEnabled}
            onCheckedChange={() => dispatch(toggleSlideImage())}
            label={t("image")}
          />
        </div>
        <ImageInput
          id="slide_image_input"
          oldImageUrl={imageSrc}
          onImageSelect={(imageSrc) => dispatch(setSlideImageSrc(imageSrc))}
        />
      </div>

      <div className="flex gap-2">
        <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden">
          {imageSrc && (
            <label htmlFor="slide_image_input">
              <Image
                src={imageSrc}
                alt={t("image_not_founded")}
                width={100}
                height={100}
                sizes="100vw"
                placeholder="blur"
                blurDataURL={imageSrc}
                className="rounded-md h-auto w-auto object-cover transition-all hover:scale-105 aspect-square border"
              />
            </label>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Label asSpan>{t("position")}</Label>
              <div className="flex flex-col items-start">
                <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-md border">
                  {imageBackgroundPositions.map((backgroundPosition) => (
                    <div
                      key={backgroundPosition}
                      onClick={() =>
                        dispatch(
                          setSlideImageBackgroundPosition(backgroundPosition)
                        )
                      }
                      className={`w-[10px] h-[10px] cursor-pointer rounded-[50%] ${
                        backgroundPosition === imageBackgroundPosition
                          ? "bg-primary"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col gap-2">
                  <Label asSpan>{t("image_fit")}</Label>
                  <Button
                    variant="outline"
                    onClick={() => dispatch(toggleSlideImageBackgroundCover())}
                    className="h-9"
                  >
                    {isImageBackgroundCover ? (
                      <Minimize2Icon />
                    ) : (
                      <Maximize2Icon />
                    )}
                  </Button>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between align-top">
                    <Label asSpan>{t("opacity")}</Label>
                    <p className="text-xs text-muted-foreground">
                      {imageOpacity}
                    </p>
                  </div>
                  <Slider
                    value={[imageOpacity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      dispatch(setSlideImageOpacity(value[0]))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label asSpan>{t("image_orientation")}</Label>

        <div className="grid grid-cols-4 gap-4 outline-none">
          {flexDirections.map((direction) => (
            <Button
              key={direction.value}
              variant="outline"
              onClick={() => dispatch(setContentOrientation(direction.value))}
              className={`[&_svg]:size-5 ${
                contentOrientation === direction.value
                  ? "border-2 border-primary"
                  : ""
              }`}
            >
              {direction.icon}
            </Button>
          ))}
        </div>
      </div>
    </fieldset>
  );
});

ImageSettings.displayName = "ImageSettings";

const Content: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();

  const {
    currentIndex,
    carousel: {
      data: { slides },
    },
  } = useCarouselsState();

  const {
    type = "regular",
    selectedTab = "text_&_image",
    ctaButton: {
      text: ctaButtonText = "",
      isEnabled: isCtaButtonEnabled = true,
    },
  } = slides[currentIndex];

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      {type === "regular" && (
        <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Tabs
            className="space-y-6"
            defaultValue={selectedTab}
            onValueChange={(value) => dispatch(setContentSelectedTab(value))}
          >
            <TabsList>
              <TabsTrigger value="text">{t("text")}</TabsTrigger>
              <TabsTrigger value="image">{t("image")}</TabsTrigger>
              <TabsTrigger value="text_&_image">
                {t("text")} & {t("image")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-6">
              <TextSettings />
            </TabsContent>
            <TabsContent value="image">
              <ImageSettings />
            </TabsContent>
            <TabsContent value="text_&_image" className="space-y-6">
              <TextSettings />
              <ImageSettings />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {(type === "intro" || type === "outro") && (
        <div className="space-y-6">
          <TextSettings />

          {type === "outro" && (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isCtaButtonEnabled}
                  onCheckedChange={() => dispatch(toggleSlideCTAButton())}
                  label={t("cta_text")}
                />
              </div>
              <Input
                value={ctaButtonText}
                onChange={(e) =>
                  dispatch(setSlideCTAText(e.target.value.trim()))
                }
                type="text"
                placeholder={t("enter_your_cta_text")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Content.displayName = "Content";

export default memo(Content);
