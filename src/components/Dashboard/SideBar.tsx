"use client";
import React, { FC, memo } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { DashboardIcon, PlanIcon, PowerOffIcon, ProfileIcon } from "@/icons";
import { PRICING_PAGE_PATH } from "@/pathNames";
import { setDashboardActiveItem } from "@/store/app.slice";
import { Link } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { LogoutButton } from "../elements";

const SideBar: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { dashboardActiveItem } = useAppState();

  return (
    <div className="flex py-4 px-6 bg-[#F0F6FD] overflow-auto gap-y-5 flex-col flex-grow">
      <nav className="flex flex-col flex-1 cursor-default select-none">
        <ul role="list" className="flex flex-col flex-1 gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              <li
                onClick={() => dispatch(setDashboardActiveItem("dashboard"))}
                className={`${
                  dashboardActiveItem === "dashboard"
                    ? "text-white bg-[#0139FF]"
                    : "hover:text-white hover:bg-[#0139FF]"
                }  flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3`}
              >
                <DashboardIcon />
                {t("dashboard")}
              </li>
            </ul>
          </li>

          <li>
            <ul className="-mx-2 space-y-1">
              <span className="font-semibold text-xs leading-6">
                {t("my_account")}
              </span>

              <li
                onClick={() => dispatch(setDashboardActiveItem("profile"))}
                className={`${
                  dashboardActiveItem === "profile"
                    ? "text-white bg-[#0139FF]"
                    : "hover:text-white hover:bg-[#0139FF]"
                } flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3`}
              >
                <ProfileIcon />
                {t("profile")}
              </li>

              <li>
                <Link
                  href={PRICING_PAGE_PATH}
                  className={
                    "hover:text-white hover:bg-[#0139FF] flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3"
                  }
                >
                  <PlanIcon />
                  {t("plan")}
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-auto -mx-2">
            <LogoutButton className="w-full">
              <PowerOffIcon />
              {t("logout")}
            </LogoutButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(SideBar);
