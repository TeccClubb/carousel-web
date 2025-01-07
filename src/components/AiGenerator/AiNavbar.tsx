"use client";
import React, { FC } from "react";
import {
  ChevronsUpDownIcon,
  DownloadIcon,
  InstagramGradientIcon,
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
import { useActiveRatioId, useRatios } from "@/hooks";
import { setActiveRatioId } from "@/store";
import { useDispatch } from "react-redux";
import { RatioId } from "@/types";

const AiNavbar: FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const router = useRouter();

  const activeRatioId = useActiveRatioId();
  const ratios = useRatios();

  const handleSave = () => {};

  const handleDownload = () => {};

  return (
    <nav className="bg-slate-50 dark:bg-gray-800 absolute top-0 left-0 right-0">
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
              onValueChange={(value: RatioId) =>
                dispatch(setActiveRatioId(value))
              }
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
