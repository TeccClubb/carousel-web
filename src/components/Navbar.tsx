"use client";
import React, { FC, memo, useState } from "react";
import { CloseIcon, LogoIcon, LongRightArrow, MenuIcon } from "@/icons";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { AvatarProfile, LanguageChanger } from "./elements";
import { useAppState } from "@/hooks/use-app-state";
import { usePathname } from "@/hooks/use-path-name";
import { useSyncAuthStatus } from "@/hooks/use-auth-status";

const Navbar: FC = () => {
  const { locale } = useAppState();

  const { isLoading, isLoggedIn } = useSyncAuthStatus();

  const [activePath, setActivePath] = useState<string>(
    `${HOME_PAGE_PATH}${locale}`
  );

  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const router = useRouter();

  const navItems = [
    {
      name: "Pricing",
      href: `/${locale}${PRICING_PAGE_PATH}`,
      auth: true,
    },
    {
      name: "Blog",
      href: `/${locale}${BLOG_PAGE_PATH}`,
      auth: true,
    },
    {
      name: "Dashboard",
      href: `/${locale}${DASHBOARD_PAGE_PATH}`,
      auth: !isLoading && isLoggedIn,
    },
  ];

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <Button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              variant="outline"
              size="icon"
              className="[&_svg]:size-6 bg-transparent"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 md:block">
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href={`${HOME_PAGE_PATH}${locale}`}
                  onClick={() => setActivePath(`${HOME_PAGE_PATH}${locale}`)}
                  className="px-3 py-2"
                  aria-current="page"
                >
                  <LogoIcon className="w-60 h-auto" />
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
                        } border-b-2 border-solid dark:border-none px-3 py-2 text-sm font-medium dark:rounded-md`}
                        aria-current={
                          activePath === item.href ? "page" : undefined
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
              href={`/${locale}${CAROUSEL_GENERATOR_PAGE_PATH}`}
              className="bg-blue dark:text-white"
            >
              <span className="sm:hidden">Generate</span>
              <span className="hidden sm:inline">Generate Carousel</span>
              <LongRightArrow className="hidden sm:inline" />
            </LinkButton>

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
                {pathname !== LOGIN_PAGE_PATH ? "Login" : "Signup"}
              </Button>
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
                    : "text-gray-500 active:text-indigo-700 active:bg-indigo-50 dark:text-gray-300 dark:active:bg-gray-700 dark:active:text-white"
                } px-3 py-2 block text-base font-medium dark:rounded-md`}
                aria-current={activePath === item.href ? "page" : undefined}
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
