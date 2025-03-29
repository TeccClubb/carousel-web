"use client";
import React, { FC, memo, useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import {
  DashboardIcon,
  EarningIcon,
  PayPalIcon,
  CarouselBuilderLogo,
} from "@/icons";
import { HOME_PAGE_PATH } from "@/pathNames";
import { setDashboardActiveItem } from "@/store/app.slice";
import { Link } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-logout";
import AddPayPalAccountDialog from "./AddPayPalAccountDialog";

const SideBar: FC<{ isSheet?: boolean }> = ({ isSheet }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { dashboardActiveItem } = useAppState();
  const { handleAffiliateUserLogout } = useLogout();

  const [addPayPalAccountDialogIsOpen, setAddPayPalAccountDialogIsOpen] =
    useState<boolean>(false);

  const items = [
    { name: "dashboard", Icon: DashboardIcon },
    { name: "earning", Icon: EarningIcon },
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
            <CarouselBuilderLogo />
          </Link>
        )}
        <ul role="list" className="flex flex-col flex-1">
          <li>
            <ul className="-mx-2 space-y-4">
              {items.map(({ name, Icon }) => (
                <li
                  key={name}
                  onClick={() => dispatch(setDashboardActiveItem(name))}
                  className={`${
                    dashboardActiveItem === name
                      ? "text-white bg-[#0139FF]"
                      : "hover:text-white hover:bg-[#0139FF]/60"
                  }  flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3 cursor-pointer`}
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
        </ul>
      </nav>
    </div>
  );
};

export default memo(SideBar);
