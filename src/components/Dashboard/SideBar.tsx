"use client";
import React, { FC, memo } from "react";
import { TOKEN_LOCAL_STORAGE_KEY } from "@/constant";
import { useAppState } from "@/hooks/use-app-state";
import { useToast } from "@/hooks/use-sonner-toast";
import { useUserState } from "@/hooks/use-user-state";
import { DashboardIcon, PlanIcon, PowerOffIcon, ProfileIcon } from "@/icons";
import { logout } from "@/lib/utils";
import { PRICING_PAGE_PATH } from "@/pathNames";
import { setDashboardActiveItem, setLoading } from "@/store/app.slice";
import { setUserData } from "@/store/user.slice";
import { Link } from "@/i18n/navigation";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

const SideBar: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { dashboardActiveItem } = useAppState();
  const toast = useToast();
  const { userData: user } = useUserState();
  const loadingSetter = ({
    isLoading,
    title,
  }: {
    isLoading: boolean;
    title?: string;
  }) => {
    dispatch(setLoading({ isLoading, title }));
  };

  const onSuccess = (message: string) => {
    toast.success(message);
    dispatch(setUserData(null));
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  };

  const onError = (message: string) => {
    toast.error(message);
  };

  const handleLogout = () =>
    logout({
      access_token: user!.access_token,
      loadingSetter,
      onSuccess,
      onError,
    });

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

          <li
            onClick={handleLogout}
            className="mt-auto -mx-2 text-white bg-red-600 hover:text-white hover:bg-red-500 flex flex-wrap font-semibold text-sm leading-6 p-2 rounded-md gap-x-3"
          >
            <PowerOffIcon />
            {t("logout")}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(SideBar);
