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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { useTranslations } from "next-intl";
import axios from "axios";
import { GET_AFFILIATE_INVITED_USERS_ROUTE } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { Copy, MoveLeft, MoveRight } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { usePagination } from "@/hooks/usePagination";
import { useFilterData } from "@/hooks/useFilterData";

const InvitedUsersTable: FC<{ className: string }> = ({ className }) => {
  const t = useTranslations();
  const toast = useToast();
  const { copiedValue, handleCopy } = useClipboard();
  const { affiliateUser } = useAffiliateUserCookie();

  type InvitedUser = {
    id: number;
    name: string;
    email: string;
    referral_code: string | null;
    total_earned: string | number;
  };

  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const data = invitedUsers.map((invitedUser, index) => ({
    ...invitedUser,
    sr: index + 1,
  }));

  const { filteredData, searchQuery, setSearchQuery, highlightText } =
    useFilterData({
      data,
      filterFields: ["name", "email", "total_earned", "referral_code"],
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
    const fetchInvitedUsers = async () => {
      try {
        const res = await axios
          .get<{
            status: boolean;
            invited_users: InvitedUser[];
          }>(GET_AFFILIATE_INVITED_USERS_ROUTE, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${affiliateUser.access_token}`,
            },
          })
          .then((res) => res.data);
        if (res.status) {
          setInvitedUsers(res.invited_users);
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
    fetchInvitedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("invited_users")}</CardTitle>
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
          {!isLoading && invitedUsers.length !== 0 && totalPages > 1 && (
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
              <TableHead className="w-fit">#</TableHead>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("earnings")}</TableHead>
              <TableHead className="text-right">{t("referral_code")}</TableHead>
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
                currentPageData.map((invitedUser) => (
                  <TableRow key={invitedUser.id}>
                    <TableCell className="font-medium">
                      {invitedUser.sr}
                    </TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(invitedUser.name),
                      }}
                    ></TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: highlightText(invitedUser.email),
                      }}
                    ></TableCell>
                    <TableCell>{invitedUser.total_earned}</TableCell>
                    <TableCell className="text-right">
                      {!invitedUser.referral_code && (
                        <span className="text-gray-400">N/A</span>
                      )}
                      {invitedUser.referral_code && (
                        <TooltipProvider>
                          <Tooltip
                            open={copiedValue === invitedUser.referral_code}
                            onOpenChange={() => {}}
                          >
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleCopy(invitedUser.referral_code!)
                                }
                                className={
                                  "bg-indigo-100 hover:bg-indigo-50 text-primary rounded-full h-6 text-md font-normal"
                                }
                              >
                                <span
                                  className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-28"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightText(
                                      invitedUser.referral_code
                                    ),
                                  }}
                                ></span>
                                <Copy />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>copied</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </TableCell>
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

export default memo(InvitedUsersTable);
