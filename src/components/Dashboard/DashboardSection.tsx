"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { TotalEarningIcon, ReferralIcon, UsersIcon } from "@/icons";
import ReportCard from "./ReportCard";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { useTranslations } from "next-intl";
import axios from "axios";
import { GET_AFFILIATE_STATS_ROUTE } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import InvitedUsersTable from "./InvitedUsersTable";
import { AffiliateUserStats } from "@/types";

const DashboardSection: FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const { affiliateUser } = useAffiliateUserCookie();

  const [stats, setStats] = useState<AffiliateUserStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios
          .get<AffiliateUserStats>(GET_AFFILIATE_STATS_ROUTE, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${affiliateUser.access_token}`,
            },
          })
          .then((res) => res.data);
        if (res.status) {
          setStats(res);
        } else {
          toast.error(t("something_went_wrong"));
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : t("something_went_wrong")
        );
      }
    };
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("dashboard")}
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ReportCard
          title={t("total_users")}
          value={stats ? stats.total_users : 0}
          icon={<UsersIcon />}
          isLoading={!stats}
        />
        <ReportCard
          title={t("total_earning")}
          value={`$${stats ? stats.total_earnings : 0.0}`}
          icon={<TotalEarningIcon />}
          isLoading={!stats}
        />
        <ReportCard
          title={t("referral_code")}
          value={stats ? stats.referral_code : ""}
          isValueCopyAble
          icon={<ReferralIcon />}
          isLoading={!stats}
        />
      </div>

      <InvitedUsersTable className="mt-8" />
    </div>
  );
};

export default memo(DashboardSection);
