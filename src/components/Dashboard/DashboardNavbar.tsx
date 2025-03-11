"use client";
import React, { FC, memo } from "react";
import { Logo } from "@/icons";
import { Link } from "@/i18n/navigation";
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui";
import { HOME_PAGE_PATH } from "@/pathNames";
import { AvatarProfile } from "../elements";
import { Menu } from "lucide-react";
import { useSyncAuthStatus } from "@/hooks/use-auth-status";
import SideBar from "./SideBar";
import { useTranslations } from "next-intl";

const DashboardNavbar: FC = () => {
  const { isLoading, isLoggedIn } = useSyncAuthStatus();
  const t = useTranslations();

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="px-4 sm:px-6 md:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden [&_svg]:size-7 p-2.5 -m-2.5"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <SheetHeader className="hidden">
                <SheetTitle>{t("dashboard")}</SheetTitle>
                <SheetDescription>
                  {t("dashboard")} {t("description")}
                </SheetDescription>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <Separator orientation="vertical" className="h-6 lg:hidden" />

          <Link href={HOME_PAGE_PATH} className="px-3 py-2" aria-current="page">
            <Logo />
          </Link>
        </div>
        {!isLoading && isLoggedIn && <AvatarProfile />}
      </div>
    </nav>
  );
};

export default memo(DashboardNavbar);
