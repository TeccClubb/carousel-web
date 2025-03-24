"use client";
import React, { FC, memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { POST_AFFILIATE_ADD_PAYPAL_ACCOUNT_ROUTE } from "@/constant";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";

const AddPayPalAccountDialog: FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const t = useTranslations();
  const { affiliateUser } = useAffiliateUserCookie();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    paypal_username: z
      .string()
      .min(1, t("enter_paypal_username"))
      .regex(/^[a-zA-Z0-9._-]+$/, { message: t("username_invalid_error") }),

    paypal_email: z
      .string()
      .min(1, {
        message: t("enter_paypal_email"),
      })
      .email({
        message: t("email_invalid_error"),
      }),

    paypal_phone: z
      .string()
      .min(1, {
        message: t("enter_paypal_phone"),
      })
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: t("phone_number_invalid_error"),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paypal_username: "",
      paypal_email: "",
      paypal_phone: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setSuccessMessage("");
      setLoading(true);

      const res = await axios
        .post<{ status: boolean; message: string }>(
          POST_AFFILIATE_ADD_PAYPAL_ACCOUNT_ROUTE,
          data,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${affiliateUser.access_token}`,
            },
          }
        )
        .then((res) => res.data);
      if (res.status) {
        form.reset();
        setSuccessMessage(res.message);
      } else {
        form.setError("root", { type: "manual", message: res.message });
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response
            ? error.response.data.message
            : error.message
          : t("something_went_wrong");
      form.setError("root", { type: "manual", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setSuccessMessage("");
        onOpenChange(isOpen);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("add_or_update_paypal_account")}</DialogTitle>
          {successMessage && (
            <DialogDescription className="text-green-800 bg-green-300/50 border-2 border-solid border-green-300 p-2 rounded-md">
              {successMessage}
            </DialogDescription>
          )}
          {form.formState.errors.root && (
            <DialogDescription className="text-red-800 bg-red-300/50 border-2 border-solid border-red-300 p-2 rounded-md">
              {form.formState.errors.root.message}
            </DialogDescription>
          )}
          {!successMessage && (
            <DialogDescription>
              {t("add_paypal_account_description")}
            </DialogDescription>
          )}
        </DialogHeader>
        {!successMessage && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
              <FormField
                control={form.control}
                name="paypal_username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("paypal_username")}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t("enter_paypal_username")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paypal_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("paypal_email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("enter_paypal_email")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paypal_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("paypal_phone")}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t("enter_paypal_phone")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant="blue"
                className="w-full"
              >
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? t("submitting") : t("submit")}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddPayPalAccountDialog);
