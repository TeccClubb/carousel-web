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
import { GET_AFFILIATE_EARNINGS_HISTORY_ROUTE } from "@/constant";
import axios from "axios";
import { useToast } from "@/hooks/use-sonner-toast";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { getFormattedDate } from "@/lib/utils";
import { useFilterData } from "@/hooks/useFilterData";
import { usePagination } from "@/hooks/usePagination";
import { MoveLeft, MoveRight } from "lucide-react";

const EarningHistoryTable: FC<{ className: string }> = ({ className }) => {
  const t = useTranslations();
  const toast = useToast();
  const { affiliateUser } = useAffiliateUserCookie();

  type EarningHistory = {
    id: number;
    amount: string | number;
    purchase_id: number;
    date: string;
    referred_user: {
      id: number;
      name: string;
      email: string;
    };
  };

  const [earningHistory, setEarningHistory] = useState<EarningHistory[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const data = earningHistory.map((history) => ({
    ...history,
    date: getFormattedDate(history.date),
  }));

  const { filteredData, searchQuery, setSearchQuery, highlightText } =
    useFilterData({
      data,
      filterFields: ["amount", "referred_user", "date", "purchase_id"],
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
            earnings: EarningHistory[];
          }>(GET_AFFILIATE_EARNINGS_HISTORY_ROUTE, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${affiliateUser.access_token}`,
            },
          })
          .then((res) => res.data);
        if (res.status) {
          setEarningHistory(res.earnings);
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
        <CardTitle>{t("earning_history")}</CardTitle>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="lg:w-[calc(100vw-22rem)] md:w-[calc(100vw-3rem)] w-[calc(100vw-2rem)]">
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
          {!isLoading && earningHistory.length !== 0 && totalPages > 1 && (
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
              <TableHead className="w-fit">{t("date")}</TableHead>
              <TableHead>{t("from")}</TableHead>
              <TableHead>{t("order_id")}</TableHead>
              <TableHead className="text-right">{t("amount")}</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && (
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 4 }).map((_, index) => (
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
                currentPageData.map((earningHistory) => (
                  <TableRow key={earningHistory.id}>
                    <TableCell
                      className="font-medium"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(earningHistory.date),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          earningHistory.referred_user.email
                        ),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          String(earningHistory.purchase_id)
                        ),
                      }}
                    ></TableCell>
                    <TableCell
                      className="text-right"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(String(earningHistory.amount)),
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

export default memo(EarningHistoryTable);
