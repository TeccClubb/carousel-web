"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslations } from "next-intl";
import { GET_AFFILIATE_WITHDRAWALS_HISTORY_ROUTE } from "@/constant";
import axios from "axios";
import { useToast } from "@/hooks/use-sonner-toast";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { getFormattedDate } from "@/lib/utils";
import { useFilterData } from "@/hooks/useFilterData";
import { MoveLeft, MoveRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

const WithdrawalHistoryTable: FC<{ className: string }> = ({ className }) => {
  const t = useTranslations();
  const toast = useToast();
  const { affiliateUser } = useAffiliateUserCookie();

  type WithdrawalHistory = {
    id: number;
    user_id: number;
    amount: string | number;
    paypal_email: string;
    paypal_username: string;
    paypal_phone: string;
    status: string;
    created_at: string;
    updated_at: string;
  };

  const [withdrawalHistory, setWithdrawalHistory] = useState<
    WithdrawalHistory[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const data = withdrawalHistory.map((history) => ({
    ...history,
    created_at: getFormattedDate(history.created_at),
    updated_at: getFormattedDate(history.updated_at),
  }));

  const { filteredData, searchQuery, setSearchQuery, highlightText } =
    useFilterData({
      data,
      filterFields: [
        "paypal_username",
        "paypal_email",
        "paypal_phone",
        "amount",
        "status",
        "updated_at",
      ],
    });

  const {
    currentPage,
    totalPages,
    pageSize,
    currentPageData,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setPageSize,
  } = usePagination({ data: filteredData, minimumPageSize: 5 });

  useEffect(() => {
    const fetchEarningHistory = async () => {
      try {
        const res = await axios
          .get<{
            status: true;
            withdrawals: WithdrawalHistory[];
          }>(GET_AFFILIATE_WITHDRAWALS_HISTORY_ROUTE, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${affiliateUser.access_token}`,
            },
          })
          .then((res) => res.data);
        if (res.status) {
          setWithdrawalHistory(res.withdrawals);
        } else {
          toast.error(t("something_went_wrong"));
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : t("something_went_wrong")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEarningHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("withdrawal_history")}</CardTitle>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent>
        <div className="flex sm:flex-row flex-col gap-2 sm:items-center items-start justify-between">
          <div className="flex sm:flex-row-reverse items-center gap-4">
            <Input
              label={t("entries_per_page")}
              value={pageSize}
              onChange={(e) => setPageSize(+e.target.value)}
              type="number"
              className="w-16"
            />
          </div>
          <div className="flex items-center gap-4">
            <Input
              label={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          {!isLoading && withdrawalHistory.length !== 0 && totalPages > 1 && (
            <TableCaption>
              <div className="flex gap-4 items-center justify-center">
                <Button
                  onClick={goToPrevPage}
                  variant="blue"
                  disabled={!hasPrevPage}
                  className="px-2 py-0 h-6 cursor-pointer duration-500"
                >
                  <MoveLeft />
                  {t("previous_page")}
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index ? "blue" : "outline"}
                    onClick={() => goToPage(index)}
                    className="p-0 h-6 w-6 cursor-pointer duration-500"
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  onClick={goToNextPage}
                  variant="blue"
                  disabled={!hasNextPage}
                  className="px-2 py-0 h-6 cursor-pointer duration-500"
                >
                  {t("next_page")}
                  <MoveRight />
                </Button>
              </div>
            </TableCaption>
          )}

          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">{t("paypal_username")}</TableHead>
              <TableHead>{t("paypal_email")}</TableHead>
              <TableHead>{t("paypal_phone")}</TableHead>
              <TableHead>{t("amount")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("date")}</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && (
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-6 w-full rounded-none" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}

          {!isLoading && (
            <TableBody>
              {currentPageData.length !== 0 ? (
                currentPageData.map((withdrawalHistory) => (
                  <TableRow key={withdrawalHistory.id}>
                    <TableCell
                      className="font-medium"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          withdrawalHistory.paypal_username
                        ),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(withdrawalHistory.paypal_email),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(withdrawalHistory.paypal_phone),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(String(withdrawalHistory.amount)),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(withdrawalHistory.status),
                      }}
                    ></TableCell>
                    <TableCell
                      className="text-right"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(withdrawalHistory.updated_at),
                      }}
                    ></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    {t("no_data_found")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
};

export default memo(WithdrawalHistoryTable);
