"use client";
import React, { FC, memo, useState } from "react";
import { CarouselBuilderLogo } from "@/icons";
import { Link, usePathname } from "@/i18n/navigation";
import { Button, LinkButton } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  AFFILIATE_LOGIN_PAGE_PATH,
  AFFILIATE_SIGNUP_PAGE_PATH,
  HOME_PAGE_PATH,
} from "@/pathNames";
import { ChevronDown, LogOut, Menu } from "lucide-react";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import SideBar from "./SideBar";
import { useTranslations } from "next-intl";
import { useAppState } from "@/hooks/use-app-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import { LanguageChanger } from "../elements";

const DashboardNavbar: FC = () => {
  const { isAppMounted } = useAppState();
  const { affiliateUser } = useAffiliateUserCookie();
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { handleAffiliateUserLogout } = useLogout();

  return (
    <nav className="dark:bg-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
                  {t("dashboard_description")}
                </SheetDescription>
              </SheetHeader>
              <SideBar isSheet setMobileMenuOpen={setMobileMenuOpen} />
            </SheetContent>
          </Sheet>

          <Separator orientation="vertical" className="h-6 lg:hidden" />

          <Link href={HOME_PAGE_PATH} aria-current="page">
            <CarouselBuilderLogo className="w-36" />
          </Link>
        </div>

        <div className="flex gap-2 sm:gap-4 items-center justify-end">
          <LanguageChanger className={"hidden lg:inline-flex"} />

          {isAppMounted && !affiliateUser && (
            <LinkButton
              href={
                pathname === AFFILIATE_LOGIN_PAGE_PATH
                  ? AFFILIATE_SIGNUP_PAGE_PATH
                  : AFFILIATE_LOGIN_PAGE_PATH
              }
              size="sm"
              variant="blue"
              className="md:h-10 md:px-4 md:py-2"
            >
              {pathname === AFFILIATE_LOGIN_PAGE_PATH
                ? t("signup")
                : t("login")}
            </LinkButton>
          )}

          {isAppMounted && affiliateUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {affiliateUser.name} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{affiliateUser.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {affiliateUser.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
              <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={handleAffiliateUserLogout}
                  className="text-destructive"
                >
                  <LogOut className="-scale-100" />
                  {t("signout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(DashboardNavbar);
