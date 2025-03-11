"use client";
import React, { FC, memo, useState } from "react";
import { CloseIcon, Logo, LogoIcon, LongRightArrow } from "@/icons";
import { Link } from "@/i18n/navigation";
import { Button, LinkButton } from "./ui";
import {
  BLOG_PAGE_PATH,
  CAROUSEL_GENERATOR_PAGE_PATH,
  DASHBOARD_PAGE_PATH,
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PRICING_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "@/pathNames";
import { usePathname } from "@/i18n/navigation";
import { AvatarProfile, LanguageChanger } from "./elements";
import { useSyncAuthStatus } from "@/hooks/use-auth-status";
import { useTranslations } from "next-intl";
import { usePlansState } from "@/hooks/use-plans.state";

const Navbar: FC = () => {
  const t = useTranslations();
  const { isLoading, isLoggedIn } = useSyncAuthStatus();
  const { activePlan } = usePlansState();

  const [activePath, setActivePath] = useState<string>(HOME_PAGE_PATH);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const navItems = [
    {
      name: t("pricing"),
      href: PRICING_PAGE_PATH,
      auth: true,
    },
    {
      name: t("blog"),
      href: BLOG_PAGE_PATH,
      auth: true,
    },
    {
      name: t("dashboard"),
      href: DASHBOARD_PAGE_PATH,
      auth: !isLoading && isLoggedIn,
    },
  ];

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <Button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="[&_svg]:size-6 p-0.5"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon />
              ) : (
                <LogoIcon />
              )}
            </Button>
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
                  <Logo />
                </Link>
                {navItems.map(
                  (item) =>
                    item.auth && (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActivePath(item.href)}
                        className={`${
                          activePath === item.href
                            ? "text-gray-900 dark:text-white dark:bg-gray-900 border-indigo-500"
                            : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        } border-b-2 border-solid dark:border-none px-3 py-2 text-sm font-medium dark:rounded-md aria-disabled:opacity-60 aria-disabled:cursor-default aria-disabled:pointer-events-none`}
                        aria-current={
                          activePath === item.href ? "page" : undefined
                        }
                        aria-disabled={
                          item.href === DASHBOARD_PAGE_PATH && !activePlan
                        }
                      >
                        {item.name}
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-1 sm:gap-4">
            <LanguageChanger />

            <LinkButton
              href={CAROUSEL_GENERATOR_PAGE_PATH}
              size="sm"
              className="bg-blue dark:text-white md:h-10 md:px-4 md:py-2"
            >
              <span className="sm:hidden">{t("generate")}</span>
              <span className="hidden sm:inline">
                {t("generate")} {t("carousel")}
              </span>
              <LongRightArrow className="hidden sm:inline" />
            </LinkButton>

            {!isLoading && isLoggedIn && <AvatarProfile />}

            {!isLoading && !isLoggedIn && (
              <LinkButton
                href={
                  pathname !== LOGIN_PAGE_PATH
                    ? LOGIN_PAGE_PATH
                    : SIGNUP_PAGE_PATH
                }
                size="sm"
                className="md:h-10 md:px-4 md:py-2"
              >
                {pathname !== LOGIN_PAGE_PATH ? t("login") : t("signup")}
              </LinkButton>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActivePath(item.href)}
                className={`${
                  activePath === item.href
                    ? "text-indigo-700 bg-indigo-50 border-indigo-500 dark:text-white dark:bg-gray-900 border-l-4 border-solid dark:border-none"
                    : "text-gray-500 active:text-indigo-700 active:bg-indigo-50 dark:text-gray-300 dark:active:bg-gray-700 dark:active:text-white aria-disabled:opacity-60 aria-disabled:cursor-default aria-disabled:pointer-events-none"
                } px-3 py-2 block text-base font-medium dark:rounded-md`}
                aria-current={activePath === item.href ? "page" : undefined}
                aria-disabled={item.href === DASHBOARD_PAGE_PATH && !activePlan}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);
