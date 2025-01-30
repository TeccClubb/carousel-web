"use client";
import { DashboardIcon, PlanIcon, PowerOffIcon, ProfileIcon } from "@/icons";
import {
  DASHBOARD_PAGE_PATH,
  PRICING_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "@/pathNames";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

const SideBar: FC = () => {
  const { t } = useTranslation();
  const [activeNavItem, setActiveNavItem] =
    useState<string>(DASHBOARD_PAGE_PATH);

  const navItems = [
    {
      href: PROFILE_PAGE_PATH,
      text: t("dashboard_profile_text"),
      icon: <ProfileIcon />,
    },
    {
      href: PRICING_PAGE_PATH,
      text: t("dashboard_plan_text"),
      icon: <PlanIcon />,
    },
  ];
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:z-50 min-h-[calc(100vh-4rem)]">
      <div className="flex py-4 px-6 bg-[#F0F6FD] overflow-y-auto gap-y-5 flex-col flex-grow">
        {/* <div className="flex shrink-0 items-center h-16">
        </div> */}
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                <li onClick={() => setActiveNavItem(DASHBOARD_PAGE_PATH)}>
                  <Link
                    href={DASHBOARD_PAGE_PATH}
                    className={`${
                      activeNavItem === DASHBOARD_PAGE_PATH
                        ? "text-white bg-[#0139FF]"
                        : "hover:text-white hover:bg-[#0139FF]"
                    }  flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3`}
                  >
                    <DashboardIcon />
                    {t("dashboard_heading")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <ul className="-mx-2 space-y-1">
                <span className="font-semibold text-xs leading-6">
                  {t("dashboard_my_account_heading")}
                </span>

                {navItems.map((item) => (
                  <li
                    key={item.href}
                    onClick={() => setActiveNavItem(item.href)}
                  >
                    <Link
                      href={item.href}
                      className={`${
                        activeNavItem === item.href
                          ? "text-white bg-[#0139FF]"
                          : "hover:text-white hover:bg-[#0139FF]"
                      }  flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3`}
                    >
                      {item.icon}
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto -mx-2 text-white bg-red-600 hover:text-white hover:bg-red-500 flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3">
              <PowerOffIcon />
              {t("dashboard_logout_text")}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
