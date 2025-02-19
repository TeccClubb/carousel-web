"use client";
import React, { FC, memo, useState } from "react";
import {
  InstagramGradientIcon,
  LinkedInGradientIcon,
  TikTokGradientIcon,
  LockIcon,
  LogoIcon,
} from "@/icons";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "../ui";
import {
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PRICING_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "@/pathNames";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AvatarProfile, DownloadButton, Toast } from "../elements";
import { useTranslation } from "react-i18next";
import { Save } from "lucide-react";
import axios, { AxiosError } from "axios";
import { SAVE_CAROUSEL_ROUTE } from "@/constant";
import {
  addNewCarousel,
  setCarousel,
  setSlideRatio,
  setTitle,
} from "@/store/carousels.slice";
import { usePathname } from "@/hooks/use-path-name";
import { useToast } from "@/hooks/use-sonner-toast";
import { useAppState } from "@/hooks/use-app-state";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { Carousel } from "@/types";
import { setLoading } from "@/store/app.slice";
import { useSyncAuthStatus } from "@/hooks/use-auth-status";
import { ratios } from "@/assets/ratios";

const AiNavbar: FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  const { isLoading, isLoggedIn, user } = useSyncAuthStatus();

  const { locale } = useAppState();
  const {
    carousel: {
      carouselId,
      title: carouselTitle,
      imageSrc: carouselImageSrc,
      data: carouselData,
    },
  } = useCarouselsState();

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
      toast.error("Please select an image in jpeg, png, or jpg formats.");
    }
  };

  const { t } = useTranslation();

  const handleSave = async () => {
    if (!user) {
      const toastId = toast.custom(
        <Toast
          action={{
            label: "View Pricing",
            onClick: () => {
              router.push(`/${locale}${PRICING_PAGE_PATH}`);
              toast.dismiss(toastId);
            },
          }}
        >
          <LockIcon />
          Please upgrade to a pro plan to save carousels.
        </Toast>
      );
    } else if (!carouselTitle) {
      setIsDialogOpen(true);
    } else {
      try {
        dispatch(setLoading({ isLoading: true, title: "Saving..." }));
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
              Authorization: `Bearer ${user.access_token}`,
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
      <div className="px-1 sm:px-2 lg:px-6">
        <div className="flex h-16 items-center justify-start sm:justify-between gap-6">
          <Link
            href={`${HOME_PAGE_PATH}${locale}`}
            aria-current="page"
          >
            <LogoIcon className="w-32 sm:w-40 md:w-60 h-auto 2xl:bg-red-50" />
          </Link>

          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-1 sm:gap-4">
            {!isLoading && (
              <Button size="sm" onClick={handleSave}>
                {!isLoggedIn && <LockIcon />}
                {isLoggedIn && <Save />}
                <span className="hidden sm:inline">{t("save_btn_text")}</span>
              </Button>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent>
                <form className="grid gap-4">
                  <DialogHeader>
                    <DialogTitle>Save new carousel</DialogTitle>
                    <DialogDescription className="hidden">
                      save new carousel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <Input
                      value={carouselTitle}
                      label={t("content_panel_switch_title_label")}
                      onChange={(e) => dispatch(setTitle(e.target.value))}
                      type="text"
                      placeholder={t("content_panel_title_placeholder")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Input
                      label={
                        <>
                          {t("content_panel_switch_image_label")}{" "}
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
                      onClick={handleSave}
                      disabled={!carouselTitle || !imageFile}
                    >
                      <Save />
                      Save
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
              <SelectTrigger>
                <SelectValue placeholder={t("carousal_type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-muted-foreground font-medium text-xs py-[0.375rem] px-2">
                    {t("carousal_type")}
                  </SelectLabel>
                  {ratios.map((ratio) => (
                    <SelectItem
                      key={ratio.ratioId}
                      value={ratio.ratioId}
                      className="rounded-sm px-2 py-1.5 outline-none text-xs"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {ratio.ratioId.includes("linkedIn") && (
                          <LinkedInGradientIcon className="aspect-square h-4 w-4" />
                        )}
                        {ratio.ratioId.includes("Insta") && (
                          <InstagramGradientIcon className="aspect-square h-4 w-4" />
                        )}
                        {ratio.ratioId.includes("tikTok") && (
                          <TikTokGradientIcon className="aspect-square h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">
                          {ratio.name} ({ratio.width}:{ratio.height})
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <DownloadButton />

            <Separator orientation="vertical" className="h-6" />

            {!isLoading && isLoggedIn && <AvatarProfile />}

            {!isLoading && !isLoggedIn && (
              <Button
                onClick={() =>
                  router.push(
                    pathname !== LOGIN_PAGE_PATH
                      ? `/${locale}${LOGIN_PAGE_PATH}`
                      : `/${locale}${SIGNUP_PAGE_PATH}`
                  )
                }
              >
                {pathname !== LOGIN_PAGE_PATH
                  ? t("login_btn_text")
                  : t("signup_btn_text")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(AiNavbar);
