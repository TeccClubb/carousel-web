"use client";
import React, { FC, memo, useState } from "react";
import Section from "../sections/Section";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-sonner-toast";
import { AFFILIATE_LOGIN_PAGE_PATH } from "@/pathNames";
import { Link, useRouter } from "@/i18n/navigation";
import { passwordPattern } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { AFFILIATE_RESET_PASSWORD_ROUTE } from "@/constant";

const AffiliateResetPassword: FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const formSchema = z
    .object({
      password: z
        .string()
        .min(1, {
          message: t("enter_your_password"),
        })
        .regex(passwordPattern, {
          message: t("create_password_invalid_error"),
        }),

      confirm_password: z.string().min(1, {
        message: t("confirm_your_password"),
      }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t("password_mismatch_error"),
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setLoading(true);
      const res = await axios
        .post<{ status: boolean; message: string }>(
          AFFILIATE_RESET_PASSWORD_ROUTE,
          {
            password: values.password,
            password_confirmation: values.confirm_password,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data);

      if (res.status) {
        toast.success(res.message);
        form.reset();
        router.push(AFFILIATE_LOGIN_PAGE_PATH);
      } else {
        toast.error(res.message);
        form.setError("root", { type: "manual", message: res.message });
        form.setValue("password", "");
        form.setValue("confirm_password", "");
        form.setFocus("password");
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response
            ? error.response.data.message
            : error.message
          : t("something_went_wrong");
      form.setError("root", { type: "manual", message: errorMessage });
      form.setValue("password", "");
      form.setValue("confirm_password", "");
      form.setFocus("password");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Section
      isHeroSection
      className="items-start"
      containerClassName="flex-col"
    >
      <h2 className="text-2xl sm:text-3xl font-bold sm:font-semibold">
        {t("ai_carousels_affiliate_program")}
      </h2>
      <p className="text-base font-medium">
        {t("join_the")} carouselbuilder.io {t("affiliate_program")}
      </p>
      <Card className="mt-8 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("update_your_password")}
          </CardTitle>
          <CardDescription>
            {t("enter_a_new_password_to_secure_your_account")}
          </CardDescription>
        </CardHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <CardContent className="pt-8 space-y-4">
              {form.formState.errors.root && (
                <div className="text-red-800 bg-red-300/50 border-2 border-solid border-red-300 p-2 rounded-md">
                  {form.formState.errors.root.message}
                </div>
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("new_password")} *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("enter_your_new_password")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("confirm_password")} *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("confirm_your_password")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                variant="blue"
                className="w-full"
              >
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? t("updating") : t("update_password")}
              </Button>
              <Link
                href={AFFILIATE_LOGIN_PAGE_PATH}
                className="text-sm font-semibold"
              >
                {t("back_to_login")}
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Section>
  );
};

export default memo(AffiliateResetPassword);
