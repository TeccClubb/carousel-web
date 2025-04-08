"use client";
import React, { FC, memo, useState } from "react";
import { CarouselBuilderLogo, LongRightArrow } from "@/icons";
import { Link, usePathname } from "@/i18n/navigation";
import { Button, LinkButton } from "./ui/button";
import {
  BLOG_PAGE_PATH,
  CAROUSEL_GENERATOR_PAGE_PATH,
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PRICING_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "@/pathNames";
import { AvatarProfile, LanguageChanger } from "./elements";
import { useTranslations } from "next-intl";
import { useUserCookie } from "@/hooks/use-cookie";
import { useAppState } from "@/hooks/use-app-state";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";

const Navbar: FC = () => {
  const { isAppMounted } = useAppState();
  const t = useTranslations();
  const pathname = usePathname();
  const { user } = useUserCookie();

  const [activePath, setActivePath] = useState<string>(HOME_PAGE_PATH);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    {
      name: t("pricing"),
      href: PRICING_PAGE_PATH,
    },
    {
      name: t("blog"),
      href: BLOG_PAGE_PATH,
    },
  ];

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex gap-1 sm:gap-3 items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden [&_svg]:size-7 p-2.5"
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
                      <CarouselBuilderLogo className="w-36" />
                    </li>
                    <li>
                      <ul role="list" className="-mx-2">
                        {[
                          { name: t("home"), href: HOME_PAGE_PATH },
                          ...navItems,
                        ].map((item) => (
                          <li key={item.href}>
                            <LinkButton
                              href={item.href}
                              onClick={() => {
                                setActivePath(item.href);
                                setMobileMenuOpen(false);
                              }}
                              variant="ghost"
                              className={`w-full justify-start hover:text-indigo-500 ${
                                activePath === item.href
                                  ? "text-indigo-500 bg-accent"
                                  : ""
                              }`}
                              aria-current={
                                activePath === item.href ? "page" : undefined
                              }
                            >
                              {item.name}
                            </LinkButton>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li>
                      <div className="text-gray-400 text-xs leading-6 font-semibold">
                        {t("language")}
                      </div>
                      <LanguageChanger
                        onLanguageChange={() => setMobileMenuOpen(false)}
                        className="w-full mt-2 h-10"
                      />
                    </li>
                    {isAppMounted && !user && (
                      <li>
                        <LinkButton
                          href={
                            pathname === LOGIN_PAGE_PATH
                              ? SIGNUP_PAGE_PATH
                              : LOGIN_PAGE_PATH
                          }
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full"
                        >
                          {pathname === LOGIN_PAGE_PATH
                            ? t("signup")
                            : t("login")}
                        </LinkButton>
                      </li>
                    )}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>

            <Separator orientation="vertical" className="h-6 lg:hidden" />

            <div className="flex items-center justify-center gap-2 h-6 sm:h-8">
              <CarouselBuilderLogo className="w-36" />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden md:block">
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href={HOME_PAGE_PATH}
                  onClick={() => setActivePath(HOME_PAGE_PATH)}
                  className="pr-3"
                  aria-current="page"
                >
                  <CarouselBuilderLogo className="w-36" />
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActivePath(item.href)}
                    className={`${
                      activePath === item.href
                        ? "text-gray-900 dark:text-white dark:bg-gray-900 border-indigo-500"
                        : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    } border-b-2 border-solid dark:border-none px-3 py-2 text-sm font-medium dark:rounded-md`}
                    aria-current={activePath === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-1 sm:gap-4">
            <LanguageChanger className="hidden md:inline-flex" />

            <LinkButton
              href={CAROUSEL_GENERATOR_PAGE_PATH}
              size="sm"
              variant="blue"
              className="md:h-10 md:px-4 md:py-2"
            >
              <span className="sm:hidden">{t("generate")}</span>
              <span className="hidden sm:inline">{t("generate_carousel")}</span>
              <LongRightArrow className="hidden sm:inline" />
            </LinkButton>

            {isAppMounted && user && <AvatarProfile />}

            {isAppMounted && !user && (
              <LinkButton
                href={
                  pathname === LOGIN_PAGE_PATH
                    ? SIGNUP_PAGE_PATH
                    : LOGIN_PAGE_PATH
                }
                size="sm"
                className="hidden md:inline-flex md:h-10 md:px-4 md:py-2"
              >
                {pathname === LOGIN_PAGE_PATH ? t("signup") : t("login")}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
