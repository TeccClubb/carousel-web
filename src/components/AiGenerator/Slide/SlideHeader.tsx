import React, { FC, useState } from "react";
import { BackgroundIcon } from "@/icons";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Switch,
  Textarea,
} from "@/components/ui";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNewSlide } from "@/hooks";
import {
  addNewSlide,
  removeSlide,
  resetNewSlide,
  setNewSlideDescription,
  setNewSlideImageSrc,
  setNewSlideSubTitle,
  setNewSlideTitle,
  toggleNewSlideDescription,
  toggleNewSlideImage,
  toggleNewSlideSubTitle,
  toggleNewSlideTitle,
} from "@/store";

const SlideHeader: FC<{
  type: "intro" | "regular" | "outro";
  index: number;
}> = ({ type, index }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleImageChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file

    if (file && file.type.startsWith("image/")) {
      const fileURL = URL.createObjectURL(file);

      dispatch(setNewSlideImageSrc(fileURL));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const {
    subTitle: { text: subTitle = "", isEnabled: isSubTitleEnabled },
    title: { text: title = "", isEnabled: isTitleEnabled },
    description: { text: description = "", isEnabled: isDescriptionEnabled },
    image: { src: imageSrc, isEnabled: isImageEnabled },
  } = useNewSlide();

  const handleChangeBackground = () => {};
  const handleAddSlide = () => {
    dispatch(addNewSlide(index));
    setIsDialogOpen(false);
    dispatch(resetNewSlide());
  };
  const handleDeleteSlide = () => {
    dispatch(removeSlide(index))
  };

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-none bg-transparent"
            >
              <PlusCircleIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new carousel</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isSubTitleEnabled}
                  onCheckedChange={() => dispatch(toggleNewSlideSubTitle())}
                  label={t("content_panel_switch_sub_title_label")}
                />
              </div>
              <Input
                value={subTitle}
                onChange={(e) =>
                  dispatch(setNewSlideSubTitle(e.target.value.trim()))
                }
                type="text"
                placeholder={t("content_panel_sub_title_placeholder")}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isTitleEnabled}
                  onCheckedChange={() => dispatch(toggleNewSlideTitle())}
                  label={t("content_panel_switch_title_label")}
                />
              </div>
              <Input
                value={title}
                onChange={(e) =>
                  dispatch(setNewSlideTitle(e.target.value.trim()))
                }
                type="text"
                placeholder={t("content_panel_title_placeholder")}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isDescriptionEnabled}
                  onCheckedChange={() => dispatch(toggleNewSlideDescription())}
                  label={t("content_panel_switch_description_label")}
                />
              </div>
              <Textarea
                value={description}
                rows={4}
                onChange={(e) =>
                  dispatch(setNewSlideDescription(e.target.value.trim()))
                }
                placeholder={t("content_panel_description_placeholder")}
                className="resize-none"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isImageEnabled}
                  onCheckedChange={() => dispatch(toggleNewSlideImage())}
                  label={t("content_panel_switch_image_label")}
                />
              </div>
              <Input
                onChange={handleImageChoose}
                type="file"
                accept="image/*"
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleAddSlide}
                disabled={!subTitle && !title && !description && !imageSrc}
              >
                Add New Slide
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {type === "regular" && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleDeleteSlide}
            className="border-none bg-transparent"
          >
            <Trash2Icon className="w-4 h-4 text-red-500" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SlideHeader;
