"use client";
import React, { FC, useMemo } from "react";
import {
  DownloadIcon,
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
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSlideRatio } from "@/hooks";

const AiNavbar: FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const router = useRouter();

  const {ratio, setSlideRatio} = useSlideRatio();

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

  const handleSave = () => {};

  const handleDownload = () => {};

  const handleSlideRatioChange = (id: string) => {
    const {width, height} = ratios.find((ratio) => ratio.id === id)!;
    dispatch(setSlideRatio({id, width, height}));
  };

  // useEffect(() => {
  //   const ratio = ratios.find((ratio) => ratio.id === activeRatioId);
  //   if (ratio) {
  //     dispatch(
  //       setSlideRatio({ id: ratio.id, width: ratio.width, height: ratio.height })
  //     );
  //   }
  // }, [activeRatioId, dispatch, ratios]);  

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
              <span className="hidden sm:inline">Save</span>
            </Button>

            <Select
              name="select_ratio"
              value={ratio.id}
              onValueChange={handleSlideRatioChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Carousel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-muted-foreground font-medium text-xs py-[0.375rem] px-2">
                    Carousel Type
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

            <Button size="sm" onClick={handleDownload}>
              <DownloadIcon />
              <span className="hidden sm:inline">Download</span>
            </Button>

            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 bg-border w-[1px] mx-1 sm:mx-2 h-6"
            ></div>

            <Image
              className="rounded-full w-12 h-12"
              src="/profile_pic.png"
              alt="Image not founded"
              width={0}
              height={0}
              sizes="100vw"
              priority
            />

            <Button
              onClick={() =>
                router.push(
                  pathname !== LOGIN_PAGE_PATH
                    ? LOGIN_PAGE_PATH
                    : SIGNUP_PAGE_PATH
                )
              }
            >
              {pathname !== LOGIN_PAGE_PATH ? "Login" : "Signup"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AiNavbar;
