import React, { FC, memo, ReactNode } from "react";
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import { useCurrentIndex, useCurrentSlide, useLastIndex } from "@/hooks";
import { useDispatch } from "react-redux";
import {
  setTitle,
  toggleSubTitle,
  setSubTitle,
  toggleTitle,
  setDescription,
  toggleDescription,
  setCTAText,
  toggleCTAButton,
  setImageSrc,
  toggleImage,
  setDescriptionFontSize,
  setTitleFontSize,
  setImageOpacity,
  setImageBackgroundPosition,
  setImageBackgroundSize,
  setContentOrientation,
  setContentSelectedTab,
} from "@/store";
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

const FontSizeSlider: FC<{
  fontSize: number;
  setFontSize: (value: number) => void;
  onResetClick: () => void;
  toolTipText: string;
}> = memo(({ fontSize, setFontSize, onResetClick, toolTipText }) => (
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
              Font Size
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
                  <span>Reset Slider</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-muted-foreground">{fontSize}%</p>
        </div>
        <Slider
          defaultValue={[fontSize]}
          min={10}
          max={200}
          step={5}
          onValueChange={(value) => setFontSize(value[0])}
        />
      </div>
    </PopoverContent>
  </Popover>
));

FontSizeSlider.displayName = "FontSizeSlider";

const TextSettings: FC = memo(() => {
  const dispatch = useDispatch();

  const { subTitle, title, description } = useCurrentSlide();

  return (
    <>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={subTitle.isEnabled}
            onCheckedChange={() => dispatch(toggleSubTitle())}
            label="Sub Title"
          />
        </div>
        <Input
          value={subTitle.text}
          onChange={(e) => dispatch(setSubTitle(e.target.value.trim()))}
          type="text"
          placeholder="Enter your sub title"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Switch
              checked={title.isEnabled}
              onCheckedChange={() => dispatch(toggleTitle())}
              label="Title"
            />
          </div>
          <FontSizeSlider
            toolTipText="Title Settings"
            fontSize={title.fontSize}
            onResetClick={() => dispatch(setTitleFontSize(100))}
            setFontSize={(value) => dispatch(setTitleFontSize(value))}
          />
        </div>

        <Input
          value={title.text}
          onChange={(e) => dispatch(setTitle(e.target.value.trim()))}
          type="text"
          placeholder="Enter your title"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Switch
              checked={description.isEnabled}
              onCheckedChange={() => dispatch(toggleDescription())}
              label="Description"
            />
          </div>
          <FontSizeSlider
            toolTipText="Description Settings"
            fontSize={description.fontSize}
            onResetClick={() => dispatch(setDescriptionFontSize(100))}
            setFontSize={(value) => dispatch(setDescriptionFontSize(value))}
          />
        </div>
        <Textarea
          value={description.text}
          rows={5}
          onChange={(e) => dispatch(setDescription(e.target.value.trim()))}
          placeholder="Enter your description"
        />
      </div>
    </>
  );
});

TextSettings.displayName = "TextSettings";

const ImageSettings: FC = memo(() => {
  const dispatch = useDispatch();

  const { contentOrientation, image } = useCurrentSlide();

  const bgPositions = [
    "left top",
    "center top",
    "right top",
    "left center",
    "center center",
    "right center",
    "left bottom",
    "center bottom",
    "right bottom",
  ];

  const flexDirections: {
    value: "row" | "row-reverse" | "column" | "column-reverse";
    icon: ReactNode;
  }[] = [
    { value: "column", icon: <HorizontalIcon /> },
    { value: "row", icon: <VerticalIcon /> },
    { value: "column-reverse", icon: <HorizontalReverseIcon /> },
    { value: "row-reverse", icon: <VerticalReverseIcon /> },
  ];

  const handleImageChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file

    if (file && file.type.startsWith("image/")) {
      const fileURL = URL.createObjectURL(file);

      dispatch(setImageSrc(fileURL));
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4 pb-8">
      <legend className="-ml-1 px-1 text-sm font-medium">
        <h3 className="font-semibold leading-none tracking-tight">
          Slide Image
        </h3>
      </legend>

      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={image.isEnabled}
            onCheckedChange={() => dispatch(toggleImage())}
            label="Image"
          />
        </div>
        <Input onChange={handleImageChoose} type="file" accept="image/*" />
      </div>

      <div className="flex gap-2">
        <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden">
          <Image
            src={image.src}
            alt="Image not founded"
            width={100}
            height={100}
            sizes="100vw"
            priority
            className="rounded-md h-auto w-auto object-cover transition-all hover:scale-105 aspect-square border"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Label asSpan>Position</Label>
              <div className="flex flex-col items-start">
                <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-md border">
                  {bgPositions.map((backgroundPosition) => (
                    <div
                      key={backgroundPosition}
                      onClick={() =>
                        dispatch(setImageBackgroundPosition(backgroundPosition))
                      }
                      className={`w-[10px] h-[10px] cursor-pointer rounded-[50%] ${
                        backgroundPosition === image.backgroundPosition
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
                  <Label asSpan>Image Fit</Label>
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(
                        setImageBackgroundSize(
                          image.backgroundSize === "cover" ? "contain" : "cover"
                        )
                      )
                    }
                    className="h-9"
                  >
                    {image.backgroundSize === "cover" ? (
                      <Minimize2Icon />
                    ) : (
                      <Maximize2Icon />
                    )}
                  </Button>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between align-top">
                    <Label asSpan>Opacity</Label>
                    <p className="text-xs text-muted-foreground">
                      {image.opacity}
                    </p>
                  </div>
                  <Slider
                    defaultValue={[image.opacity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      dispatch(setImageOpacity(value[0]))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label asSpan>Image Orientation</Label>

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

const Content: FC = memo(() => {
  const dispatch = useDispatch();
  const index = useCurrentIndex();
  const lastIndex = useLastIndex();

  const { selectedTab, ctaButton } = useCurrentSlide();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      {0 < index && index < lastIndex && (
        <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Tabs
            className="space-y-6"
            defaultValue={selectedTab || "text_&_image"}
            onValueChange={(value) => dispatch(setContentSelectedTab(value))}
          >
            <TabsList>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="text_&_image">Text & Image</TabsTrigger>
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

      {(index === 0 || index === lastIndex) && (
        <div className="space-y-6">
          <TextSettings />

          {index === lastIndex && (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={ctaButton.isEnabled}
                  onCheckedChange={() => dispatch(toggleCTAButton())}
                  label="CTA Text"
                />
              </div>
              <Input
                value={ctaButton.text}
                onChange={(e) => dispatch(setCTAText(e.target.value.trim()))}
                type="text"
                placeholder="Enter your title"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Content.displayName = "Content";

export default Content;
