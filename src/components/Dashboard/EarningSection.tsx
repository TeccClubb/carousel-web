"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTranslations } from "next-intl";
import EarningHistoryTable from "./EarningHistoryTable";
import WithdrawalHistoryTable from "./WithdrawalHistoryTable";
import AddPayPalAccountDialog from "./AddPayPalAccountDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { useToast } from "@/hooks/use-sonner-toast";
import {
  GET_AFFILIATE_STATS_ROUTE,
  POST_AFFILIATE_WITHDRAWAL_REQUEST_ROUTE,
} from "@/constant";
import axios, { AxiosError } from "axios";
import { AffiliateUserStats } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app.slice";
import { useRouter } from "@/i18n/navigation";

const EarningSection: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const toast = useToast();
  const router = useRouter();
  const { affiliateUser } = useAffiliateUserCookie();

  const [addPayPalAccountDialogIsOpen, setAddPayPalAccountDialogIsOpen] =
    useState<boolean>(false);

  const [withdrawalErrorDialogIsOpen, setWithdrawalErrorDialogIsOpen] =
    useState<boolean>(false);

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

  const handleWithdrawalRequest = async () => {
    if (
      stats &&
      Number(stats.total_earnings) - Number(stats.total_withdrawals) >= 10
    ) {
      try {
        dispatch(setLoading({ isLoading: true, title: t("requesting") }));
        const res = await axios
          .post<{ status: boolean; message: string }>(
            POST_AFFILIATE_WITHDRAWAL_REQUEST_ROUTE,
            {
              amount:
                Number(stats.total_earnings) - Number(stats.total_withdrawals),
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${affiliateUser.access_token}`,
              },
            }
          )
          .then((res) => res.data);
        if (res.status) {
          router.refresh();
          toast.success(res.message);
        } else {
          if (res.message === "Please set your PayPal details first.") {
            setAddPayPalAccountDialogIsOpen(true);
          }
          toast.error(res.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response
              ? error.response.data.message
              : error.message
            : t("something_went_wrong");
        if (errorMessage === "Please set your PayPal details first.") {
          setAddPayPalAccountDialogIsOpen(true);
        }
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    } else {
      setWithdrawalErrorDialogIsOpen(true);
    }
  };

  return (
    <div className="w-full">
      <h2 className="w-full text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("earning")}
      </h2>

      <Card className="w-[250px]">
        <CardHeader className="">
          <span className="text-base leading-7 mb-8">
            {t("balance_available_for_use")}
          </span>
          <CardTitle className="text-2xl font-semibold">
            {!stats && <Skeleton className="h-6 w-32" />}
            {stats &&
              `$${
                Number(stats.total_earnings) - Number(stats.total_withdrawals)
              }`}
          </CardTitle>
          <CardDescription className="text-sm leading-7 mt-6">
            {!stats && <Skeleton className="h-4 w-32" />}
            {stats && `${t("total_withdraw")}: $${stats.total_withdrawals}`}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          {stats && (
            <Button
              variant="blue"
              onClick={handleWithdrawalRequest}
              className="rounded-full"
            >
              {t("withdraw")}
            </Button>
          )}
        </CardFooter>
      </Card>

      <AddPayPalAccountDialog
        open={addPayPalAccountDialogIsOpen}
        onOpenChange={setAddPayPalAccountDialogIsOpen}
      />

      <AlertDialog
        open={withdrawalErrorDialogIsOpen}
        onOpenChange={setWithdrawalErrorDialogIsOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              {t("withdrawal_error")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-primary">
              {t("minimum_withdrawal_amount_error")} <strong>$10</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction variant="blue">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EarningHistoryTable className="mt-8" />

      <WithdrawalHistoryTable className="mt-8" />
    </div>
  );
};

export default memo(EarningSection);
