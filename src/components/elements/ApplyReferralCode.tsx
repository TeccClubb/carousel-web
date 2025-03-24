"use client";
import React, { FC, memo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-sonner-toast";
import axios, { AxiosError } from "axios";
import { POST_APPLY_REFERRAL_CODE_ROUTE } from "@/constant";
import { useUserCookie } from "@/hooks/use-cookie";

const ApplyReferralCode: FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { user } = useUserCookie();

  const formSchema = z.object({
    referral_code: z.string().min(1, {
      message: t("paste_here_referral_code"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referral_code: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setLoading(true);

      const res = await axios
        .post<{ status: boolean; message: string }>(
          POST_APPLY_REFERRAL_CODE_ROUTE,
          data,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        )
        .then((res) => res.data);
      if (res.status) {
        toast.success(res.message);
        setSuccessMessage(res.message);
      } else {
        toast.error(res.message);
        form.setError("referral_code", {
          type: "manual",
          message: res.message,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response
            ? error.response.data.message
            : error.message
          : t("something_went_wrong");
      form.setError("referral_code", { type: "manual", message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="referral_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("referral_code")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("paste_here_referral_code")}
                  className="w-fit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {successMessage && (
                <span className="text-green-600 text-sm font-medium">
                  {successMessage}
                </span>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" disabled={isLoading} className="w-fit">
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? t("applying") : t("apply")}
        </Button>
      </form>
    </Form>
  );
};

export default memo(ApplyReferralCode);
