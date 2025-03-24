import React, { FC, FormEvent, memo, useState } from "react";
import { BackgroundIcon } from "@/icons";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageInput, Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import {
  addNewSlide,
  removeSlide,
  resetNewSlide,
  setNewSlideDescription,
  setNewSlideImageSrc,
  setNewSlideSubTitle,
  setNewSlideTitle,
  setSlideBackgroundImageBackgroundPosition,
  setSlideBackgroundImageOpacity,
  setSlideBackgroundImageSrc,
  toggleNewSlideDescription,
  toggleNewSlideImage,
  toggleNewSlideSubTitle,
  toggleNewSlideTitle,
  toggleSlideBackgroundImage,
} from "@/store/carousels.slice";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { imageBackgroundPositions } from "@/assets/imageBackgroundPositions";

const SlideHeader: FC<{
  type: "intro" | "regular" | "outro";
  index: number;
}> = ({ type, index }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const [isOpen, setOpen] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {
    carousel: {
      data: { slides },
    },
    newSlide: {
      subTitle: { text: subTitle = "", isEnabled: isSubTitleEnabled },
      title: { text: title = "", isEnabled: isTitleEnabled },
      description: { text: description = "", isEnabled: isDescriptionEnabled },
      image: { src: imageSrc, isEnabled: isImageEnabled },
    },
  } = useCarouselsState();

  const {
    backgroundImage: {
      src: backgroundImageSrc = "",
      isEnabled: isBackgroundImageEnabled,
      backgroundPosition: backgroundImageBackgroundPosition = "center center",
      opacity: backgroundImageOpacity = 30,
    },
  } = slides[index];

  const handleAddSlide = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addNewSlide(index));
    setIsDialogOpen(false);
    dispatch(resetNewSlide());
  };
  const handleDeleteSlide = () => {
    dispatch(removeSlide(index));
  };

  return (
    <div className="py-1 flex justify-between">
      <Popover open={isOpen} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none bg-transparent"
                >
                  <BackgroundIcon size={4} />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="z-[1000]">
              {t("background_image")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-60 flex flex-col gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={isBackgroundImageEnabled}
                onCheckedChange={() =>
                  dispatch(toggleSlideBackgroundImage(index))
                }
                label={t("image")}
              />
            </div>
            <ImageInput
              id="background_image_input"
              oldImageUrl={backgroundImageSrc}
              onImageSelect={(imageSrc) =>
                dispatch(setSlideBackgroundImageSrc({ index, imageSrc }))
              }
              disabled={!isBackgroundImageEnabled}
            />
          </div>
          {backgroundImageSrc != "" && (
            <div
              className="flex gap-2 aria-disabled:opacity-60 aria-disabled:pointer-events-none"
              aria-disabled={!isBackgroundImageEnabled}
            >
              <label
                htmlFor="background_image_input"
                className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden"
              >
                <Image
                  src={backgroundImageSrc}
                  alt={t("image_not_founded")}
                  width={100}
                  height={100}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={backgroundImageSrc}
                  className="rounded-md h-auto w-auto object-cover transition-all hover:scale-105 aspect-square border"
                />
              </label>
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
                                setSlideBackgroundImageBackgroundPosition({
                                  index,
                                  backgroundPosition,
                                })
                              )
                            }
                            className={`w-[10px] h-[10px] cursor-pointer rounded-[50%] ${
                              backgroundPosition ===
                              backgroundImageBackgroundPosition
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
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between align-top">
                          <Label asSpan>{t("opacity")}</Label>
                          <p className="text-xs text-muted-foreground">
                            {backgroundImageOpacity}
                          </p>
                        </div>
                        <Slider
                          value={[backgroundImageOpacity]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) =>
                            dispatch(
                              setSlideBackgroundImageOpacity({
                                index,
                                opacity: value[0],
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button size="sm" onClick={() => setOpen(false)} className="self-end">
            {t("close")}
          </Button>
        </PopoverContent>
      </Popover>

      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-none bg-transparent"
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[1000]">
                {t("add_slide")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <form className="grid gap-4" onSubmit={handleAddSlide}>
              <DialogHeader>
                <DialogTitle>{t("add_new_slide")}</DialogTitle>
                <DialogDescription className="hidden">
                  {t("add_new_slide")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isSubTitleEnabled}
                    onCheckedChange={() => dispatch(toggleNewSlideSubTitle())}
                    label={t("sub_title")}
                  />
                </div>
                <Input
                  value={subTitle}
                  onChange={(e) =>
                    dispatch(setNewSlideSubTitle(e.target.value))
                  }
                  type="text"
                  placeholder={t("enter_your_sub_title")}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isTitleEnabled}
                    onCheckedChange={() => dispatch(toggleNewSlideTitle())}
                    label={t("title")}
                  />
                </div>
                <Input
                  value={title}
                  onChange={(e) => dispatch(setNewSlideTitle(e.target.value))}
                  type="text"
                  placeholder={t("enter_your_title")}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isDescriptionEnabled}
                    onCheckedChange={() =>
                      dispatch(toggleNewSlideDescription())
                    }
                    label={t("description")}
                  />
                </div>
                <Textarea
                  value={description}
                  rows={4}
                  onChange={(e) =>
                    dispatch(setNewSlideDescription(e.target.value))
                  }
                  placeholder={t("enter_your_description")}
                  className="resize-none"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isImageEnabled}
                    onCheckedChange={() => dispatch(toggleNewSlideImage())}
                    label={t("image")}
                  />
                </div>
                <ImageInput
                  oldImageUrl={imageSrc}
                  onImageSelect={(imageSrc) =>
                    dispatch(setNewSlideImageSrc(imageSrc))
                  }
                />
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={t("image_not_founded")}
                    width={100}
                    height={100}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={imageSrc}
                    className="rounded-md h-auto w-auto object-cover transition-all hover:scale-105 aspect-video border"
                  />
                )}
              </div>

              <DialogFooter>
                <Button
                  disabled={!subTitle && !title && !description && !imageSrc}
                >
                  {t("add_new_slide")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {type === "regular" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDeleteSlide}
                  className="border-none bg-transparent"
                >
                  <Trash2Icon className="w-4 h-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[1000]">
                {t("delete_slide")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default memo(SlideHeader);
