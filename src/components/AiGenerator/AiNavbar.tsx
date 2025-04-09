"use client";
import React, { FC, FormEvent, memo, MouseEvent, useState } from "react";
import {
  InstagramGradientIcon,
  TikTokGradientIcon,
  FacebookIcon,
  LinkedInIcon,
  CarouselBuilderLogo,
} from "@/icons";
import { Link } from "@/i18n/navigation";
import { Button, LinkButton } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import {
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PRICING_PAGE_PATH,
} from "@/pathNames";
import { useRouter } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import { AvatarProfile, LanguageChanger, Toast } from "../elements";
import { DownloadIcon, Loader2, LockKeyhole, Menu, Save } from "lucide-react";
import axios, { AxiosError } from "axios";
import { SAVE_CAROUSEL_ROUTE } from "@/constant";
import {
  addNewCarousel,
  setCarousel,
  setSlideRatio,
  setTitle,
} from "@/store/carousels.slice";
import { useToast } from "@/hooks/use-sonner-toast";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { Carousel } from "@/types";
import { setLoading } from "@/store/app.slice";
import { useActivePlanCookie, useUserCookie } from "@/hooks/use-cookie";
import { ratios } from "@/assets/ratios";
import { useTranslations } from "next-intl";
import { useAppState } from "@/hooks/use-app-state";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AiNavbar: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const t = useTranslations();
  const { isAppMounted } = useAppState();
  const { user } = useUserCookie();
  const { activePlan } = useActivePlanCookie();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [isPDFGenerating, setIsPDFGenerating] = useState<boolean>(false);

  const {
    carousel: {
      carouselId,
      title: carouselTitle,
      imageSrc: carouselImageSrc,
      data: carouselData,
    },
  } = useCarouselsState();

  const {
    slideRatio: { ratioId },
  } = carouselData;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const handleImageChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.toLowerCase();
      if (
        fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg"
      ) {
        setImageFile(file);
      }
    } else {
      toast.error(t("invalid_image_select_error_message"));
    }
  };

  const handleDownload = async () => {
    try {
      setIsPDFGenerating(true);
      const filename = ratioId.includes("linkedIn")
        ? "LinkedIn"
        : ratioId.includes("instaFeed")
        ? "Instagram-Feed"
        : ratioId.includes("instaStories")
        ? "Instagram-Stories"
        : ratioId.includes("facebookFeed")
        ? "Facebook-Feed"
        : ratioId.includes("facebookStories")
        ? "Facebook-Stories"
        : ratioId.includes("tikTok")
        ? "TikTok"
        : "";
      const encodedCarousel = encodeURIComponent(JSON.stringify(carouselData));
      const encodedUser = encodeURIComponent(JSON.stringify(user));
      const response = await fetch(
        `/api/generate-pdf?carousel=${encodedCarousel}&user=${encodedUser}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}-Carousel.pdf`;
        link.click();
        toast.success(t("carousel_successfully_generated"));
      } else {
        toast.error(
          "Failed to generate, maybe chromium not installed, check version of chromium"
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating pdf"
      );
    } finally {
      setIsPDFGenerating(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSave = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    if (!activePlan) {
      const toastId = toast.custom(
        <Toast
          action={{
            label: t("view_pricing"),
            onClick: () => {
              router.push(PRICING_PAGE_PATH);
              toast.dismiss(toastId);
            },
          }}
        >
          <LockKeyhole className="size-3.5" />
          {t("upgrade_to_pro_to_save")}
        </Toast>
      );
    } else if (!carouselTitle) {
      setIsDialogOpen(true);
    } else {
      try {
        dispatch(setLoading({ isLoading: true, title: t("saving") }));
        const formData = new FormData();
        formData.append("carousel_id", carouselId ? String(carouselId) : "");
        formData.append("title", carouselTitle.trim());
        formData.append("options", JSON.stringify(carouselData));
        if (!carouselImageSrc) formData.append("image", imageFile!);

        type ResponseData = {
          status: boolean;
          message: string;
          carousel: {
            id: number;
            title: string;
            image: string;
            options: string;
            created_at: string;
            updated_at: string;
          };
        };

        const resData = await axios
          .post<ResponseData>(SAVE_CAROUSEL_ROUTE, formData, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user?.access_token}`,
            },
          })
          .then((res) => res.data);
        if (resData.status) {
          const carousel: Carousel = {
            carouselId: resData.carousel.id,
            title: resData.carousel.title,
            imageSrc: resData.carousel.image,
            data: JSON.parse(resData.carousel.options),
          };
          if (carouselId) {
            dispatch(setCarousel(carousel));
          } else dispatch(addNewCarousel(carousel));
          toast.success(resData.message);
        } else toast.error(resData.message);
      } catch (error) {
        toast.error(
          error instanceof AxiosError
            ? error.message
            : "Something went wrong while saving"
        );
      } finally {
        dispatch(setLoading({ isLoading: false }));
        setIsDialogOpen(false);
      }
    }
  };

  const handleSlideRatioChange = (ratioId: string) => {
    const { width, height } = ratios.find(
      (ratio) => ratio.ratioId === ratioId
    )!;
    dispatch(setSlideRatio({ ratioId, width, height }));
  };

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="pr-2 pl-2 lg:pl-[4.25rem] md:pr-6">
        <div className="flex h-16 items-center justify-start sm:justify-between gap-2 lg:gap-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden [&_svg]:size-7 p-2.5"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader className="hidden">
                <SheetTitle>nav side bar</SheetTitle>
                <SheetDescription>nav side bar description</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col flex-1 cursor-default select-none">
                <ul role="list" className="flex flex-col flex-1 gap-y-7">
                  <li>
                    <Link href={HOME_PAGE_PATH}>
                      <CarouselBuilderLogo className="w-36" />
                    </Link>
                  </li>

                  <li>
                    <Button onClick={handleSave} className="w-full">
                      {isAppMounted && !activePlan && (
                        <LockKeyhole className="size-4" />
                      )}
                      {isAppMounted && activePlan && <Save />}
                      {t("save")}
                    </Button>
                  </li>

                  <li>
                    <Button
                      onClick={handleDownload}
                      disabled={isPDFGenerating}
                      className="w-full"
                    >
                      {isPDFGenerating && (
                        <>
                          <Loader2 className="animate-spin" />
                          {t("generating")}
                        </>
                      )}

                      {!isPDFGenerating && (
                        <>
                          <DownloadIcon />
                          {t("download")}
                        </>
                      )}
                    </Button>
                  </li>

                  <li>
                    <div className="text-gray-400 text-xs leading-6 font-semibold">
                      {t("language")}
                    </div>
                    <LanguageChanger
                      onLanguageChange={() => setMobileMenuOpen(false)}
                      className="w-full mt-2 h-10"
                      asDialog
                    />
                  </li>
                  {isAppMounted && !user && (
                    <li>
                      <LinkButton
                        href={LOGIN_PAGE_PATH}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full"
                      >
                        {t("login")}
                      </LinkButton>
                    </li>
                  )}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href={HOME_PAGE_PATH} aria-current="page">
            <CarouselBuilderLogo className="hidden md:inline w-36" />
          </Link>

          <div className="flex flex-1 items-center justify-end pr-2 sm:inset-auto sm:pr-0 gap-1 md:gap-2 lg:gap-4">
            <LanguageChanger className="hidden md:inline-flex" />
            <Button
              size="sm"
              onClick={handleSave}
              className="hidden md:inline-flex"
            >
              {isAppMounted && !activePlan && (
                <LockKeyhole className="size-4" />
              )}
              {isAppMounted && activePlan && <Save />}
              {t("save")}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent>
                <form className="grid gap-4" onSubmit={handleSave}>
                  <DialogHeader>
                    <DialogTitle>{t("save_new_carousel")}</DialogTitle>
                    <DialogDescription className="hidden">
                      {t("save_new_carousel")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <Input
                      value={carouselTitle}
                      label={t("title")}
                      onChange={(e) => dispatch(setTitle(e.target.value))}
                      type="text"
                      placeholder={t("enter_your_title")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Input
                      label={
                        <>
                          {t("image")}
                          {imageFile && (
                            <span style={{ color: "green" }}>
                              ({imageFile.name})
                            </span>
                          )}
                        </>
                      }
                      onChange={handleImageChoose}
                      type="file"
                      accept="image/*"
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={!carouselTitle || !imageFile}
                    >
                      <Save />
                      {t("save")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Select
              name="select_ratio"
              value={carouselData.slideRatio.ratioId}
              onValueChange={handleSlideRatioChange}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder={t("carousel_type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-muted-foreground font-medium text-xs py-[0.375rem] px-2">
                    {t("carousel_type")}
                  </SelectLabel>
                  {ratios.map((ratio) => (
                    <SelectItem
                      key={ratio.ratioId}
                      value={ratio.ratioId}
                      className="rounded-sm px-2 py-1.5 outline-none text-xs"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {ratio.ratioId.includes("linkedIn") && (
                          <LinkedInIcon className="text-[#0A66C2] aspect-square h-4 w-4" />
                        )}
                        {ratio.ratioId.includes("insta") && (
                          <InstagramGradientIcon className="aspect-square h-4 w-4" />
                        )}
                        {ratio.ratioId.includes("facebook") && (
                          <FacebookIcon className="text-[#0866FF] aspect-square h-4 w-4" />
                        )}
                        {ratio.ratioId.includes("tikTok") && (
                          <TikTokGradientIcon className="aspect-square h-4 w-4" />
                        )}
                        {ratio.name} ({ratio.width}:{ratio.height})
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              size="sm"
              onClick={handleDownload}
              disabled={isPDFGenerating}
              className="hidden md:inline-flex"
            >
              {isPDFGenerating && (
                <>
                  <Loader2 className="animate-spin" />
                  {t("generating")}
                </>
              )}

              {!isPDFGenerating && (
                <>
                  <DownloadIcon />
                  {t("download")}
                </>
              )}
            </Button>

            <Separator
              orientation="vertical"
              className={`h-6 ${
                isAppMounted && !user ? "hidden md:inline" : ""
              }`}
            />

            {isAppMounted && user && <AvatarProfile />}

            {isAppMounted && !user && (
              <LinkButton
                href={LOGIN_PAGE_PATH}
                size="sm"
                className="hidden md:inline-flex lg:h-10 lg:px-4 lg:py-2"
              >
                {t("login")}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(AiNavbar);
