"use client";
import React, { FC, memo, useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import {
  DashboardIcon,
  EarningIcon,
  PayPalIcon,
  CarouselBuilderLogo,
} from "@/icons";
import {
  AFFILIATE_DASHBOARD_EARNINGS_PAGE_PATH,
  AFFILIATE_DASHBOARD_PAGE_PATH,
  HOME_PAGE_PATH,
} from "@/pathNames";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-logout";
import AddPayPalAccountDialog from "./AddPayPalAccountDialog";
import { LanguageChanger } from "../elements";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { cn } from "@/lib/utils";

const SideBar: FC<{
  isSheet?: boolean;
  setMobileMenuOpen?: (isOpen: boolean) => void;
}> = ({ isSheet, setMobileMenuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { isAppMounted } = useAppState();
  const { affiliateUser } = useAffiliateUserCookie();
  const { handleAffiliateUserLogout } = useLogout();

  const [addPayPalAccountDialogIsOpen, setAddPayPalAccountDialogIsOpen] =
    useState<boolean>(false);

  const items = [
    {
      name: "dashboard",
      Icon: DashboardIcon,
      href: AFFILIATE_DASHBOARD_PAGE_PATH,
    },
    {
      name: "earning",
      Icon: EarningIcon,
      href: AFFILIATE_DASHBOARD_EARNINGS_PAGE_PATH,
    },
  ];

  return (
    <div className="flex py-4 px-6 overflow-auto gap-y-5 flex-col flex-grow">
      <AddPayPalAccountDialog
        open={addPayPalAccountDialogIsOpen}
        onOpenChange={setAddPayPalAccountDialogIsOpen}
      />
      <nav className="flex flex-col flex-1 cursor-default select-none">
        {isSheet && (
          <Link href={HOME_PAGE_PATH} className="my-6" aria-current="page">
            <CarouselBuilderLogo className="w-36" />
          </Link>
        )}
        <ul role="list" className="flex flex-col flex-1">
          {isAppMounted && affiliateUser && (
            <>
              <li>
                <ul className="-mx-2 space-y-4">
                  {items.map(({ name, Icon, href }) => (
                    <li
                      key={href}
                      onClick={() => {
                        router.push(href);
                        if (setMobileMenuOpen) setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3 cursor-pointer",
                        pathname === href
                          ? "text-white bg-[#0139FF]"
                          : "hover:text-white hover:bg-[#0139FF]/60"
                      )}
                    >
                      <Icon />
                      {t(name)}
                    </li>
                  ))}
                </ul>
              </li>

              <li
                onClick={() => setAddPayPalAccountDialogIsOpen(true)}
                className="hover:text-white hover:bg-[#0139FF]/60 flex flex-wrap font-semibold text-sm leading-6 -mx-2 mt-8 p-2 rounded-md gap-x-3 cursor-pointer"
              >
                <PayPalIcon />
                {t("paypal_account")}
              </li>
            </>
          )}

          {isSheet && setMobileMenuOpen && (
            <li className="mt-8">
              <div className="text-gray-400 text-xs leading-6 font-semibold">
                {t("language")}
              </div>
              <LanguageChanger
                onLanguageChange={() => setMobileMenuOpen(false)}
                className="w-full mt-2 h-10"
                asDialog
              />
            </li>
          )}

          {isAppMounted && affiliateUser && (
            <li className="mt-auto -mx-2">
              <Button
                onClick={handleAffiliateUserLogout}
                variant="destructive"
                className="w-full rounded-full"
              >
                <LogOut className="-scale-100" />
                {t("signout")}
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default memo(SideBar);
