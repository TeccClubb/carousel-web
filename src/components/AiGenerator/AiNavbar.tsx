"use client";
import React, { FC, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/pathNames";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAuthStatus, usePathname, useSlideRatio } from "@/hooks";
import { Avatar, DownloadButton } from "../elements";
import { useTranslation } from "react-i18next";

const AiNavbar: FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const router = useRouter();

  const { isLoading, isLoggedIn } = useAuthStatus();

  const { ratio, setSlideRatio } = useSlideRatio();

  const ratios = useMemo(
    () => [
      {
        id: "linkedIn1",
        name: "LinkedIn (4:5)",
        width: 4,
        height: 5,
        icon: <LinkedInGradientIcon className="aspect-square h-4 w-4" />,
      },
      {
        id: "linkedIn2",
        name: "LinkedIn (1:1)",
        width: 1,
        height: 1,
        icon: <LinkedInGradientIcon className="aspect-square h-4 w-4" />,
      },
      {
        id: "InstaFeed1",
        name: "Insta Feed (4:5)",
        width: 4,
        height: 5,
        icon: <InstagramGradientIcon className="aspect-square h-4 w-4" />,
      },

      {
        id: "InstaFeed2",
        name: "Insta Feed (1:1)",
        width: 1,
        height: 1,
        icon: <InstagramGradientIcon className="aspect-square h-4 w-4" />,
      },
      {
        id: "InstaStories",
        name: "Insta Stories (9:16)",
        width: 9,
        height: 16,
        icon: <InstagramGradientIcon className="aspect-square h-4 w-4" />,
      },
      {
        id: "tikTok",
        name: "TikTok (9:16)",
        width: 9,
        height: 16,
        icon: <TikTokGradientIcon className="aspect-square h-4 w-4" />,
      },
    ],
    []
  );

  const { t } = useTranslation();

  const handleSave = () => {};

  const handleSlideRatioChange = (id: string) => {
    const { width, height } = ratios.find((ratio) => ratio.id === id)!;
    dispatch(setSlideRatio({ id, width, height }));
  };

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={HOME_PAGE_PATH} className="px-3 py-2" aria-current="page">
            <LogoIcon className="w-24 h-auto" />
          </Link>

          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-1 sm:gap-4">
            <Button size="sm" onClick={handleSave}>
              <LockIcon />
              <span className="hidden sm:inline">
                {t("save_btn_text")}
              </span>
            </Button>

            <Select
              name="select_ratio"
              value={ratio.id}
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
                      key={ratio.id}
                      value={ratio.id}
                      className="rounded-sm px-2 py-1.5 outline-none text-xs"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {ratio.icon}
                        {ratio.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <DownloadButton/>

            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 bg-border w-[1px] mx-1 sm:mx-2 h-6"
            ></div>

            {!isLoading && isLoggedIn && <Avatar />}

            {!isLoading && !isLoggedIn && (
              <Button
                onClick={() =>
                  router.push(
                    pathname !== LOGIN_PAGE_PATH
                      ? LOGIN_PAGE_PATH
                      : SIGNUP_PAGE_PATH
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

export default AiNavbar;
