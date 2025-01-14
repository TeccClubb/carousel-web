"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronsUpDownIcon,
  DownloadIcon,
  // InstagramGradientIcon,
  LockIcon,
  LogoIcon,
} from "@/icons";
import Link from "next/link";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { HOME_PAGE_PATH, LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/pathNames";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSlideRatio } from "@/store";

const AiNavbar: FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const router = useRouter();

  const [activeRatioId, setActiveRatioId] = useState<string>("linkedIn1");

  const ratios = useMemo(
    () => [
      {
        id: "linkedIn1",
        name: "LinkedIn (4:5)",
        width: 4,
        height: 5,
      },
      {
        id: "linkedIn2",
        name: "LinkedIn (1:1)",
        width: 1,
        height: 1,
      },
      {
        id: "InstaFeed1",
        name: "Insta Feed (4:5)",
        width: 4,
        height: 5,
      },

      {
        id: "InstaFeed2",
        name: "Insta Feed (1:1)",
        width: 1,
        height: 1,
      },
      {
        id: "InstaStories",
        name: "Insta Stories (9:16)",
        width: 9,
        height: 16,
      },
      {
        id: "tikTok",
        name: "TikTok (9:16)",
        width: 9,
        height: 16,
      },
    ],
    []
  );

  const handleSave = () => {};

  const handleDownload = () => {};

  const handleSlideRatio = useCallback(() => {
    const ratio = ratios.find((ratio) => ratio.id === activeRatioId);
    dispatch(
      setSlideRatio({ slideWidth: ratio!.width, slideHeight: ratio!.height })
    );
  }, [activeRatioId, dispatch, ratios]);

  useEffect(() => {
    handleSlideRatio();
  }, [handleSlideRatio]);

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
              name="ratio"
              value={activeRatioId}
              onValueChange={(value) => setActiveRatioId(value)}
            >
              <SelectTrigger className="h-9 px-4 py-2 rounded-md text-sm font-medium">
                <SelectValue placeholder="Carousel Type" />
                <ChevronsUpDownIcon className="dark:text-white" />
              </SelectTrigger>
              <SelectContent>
                {ratios.map((ratio) => (
                  <SelectItem
                    key={ratio.id}
                    value={ratio.id}
                    // icon={
                    //   <InstagramGradientIcon className="aspect-square h-4 w-4" />
                    // }
                    tickSide="right"
                    className="rounded-sm px-2 py-1.5 outline-none text-xs"
                  >
                    {ratio.name}
                  </SelectItem>
                ))}
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
