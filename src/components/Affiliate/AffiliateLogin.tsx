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
import { Checkbox } from "../ui/checkbox";
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
import {
  AFFILIATE_DASHBOARD_PAGE_PATH,
  AFFILIATE_FORGOT_PASSWORD_PAGE_PATH,
  AFFILIATE_SIGNUP_PAGE_PATH,
} from "@/pathNames";
import { Link, useRouter } from "@/i18n/navigation";
import axios, { AxiosError } from "axios";
import { AFFILIATE_LOGIN_ROUTE } from "@/constant";
import { Loader2 } from "lucide-react";
import { useAffiliateUserCookie } from "@/hooks/use-cookie";
import { AffiliateUser } from "@/types";

const AffiliateLogin: FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setAffiliateUserCookie } = useAffiliateUserCookie();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: t("enter_your_email_address"),
      })
      .email({
        message: t("email_invalid_error"),
      }),

    password: z.string().min(1, {
      message: t("enter_your_password"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setLoading(true);

      type LoginResponse = {
        status: boolean;
        message: string;
        access_token: string;
        user: AffiliateUser;
      };

      const res = await axios
        .post<LoginResponse>(
          AFFILIATE_LOGIN_ROUTE,
          {
            email: values.email,
            password: values.password,
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
        setAffiliateUserCookie({
          name: res.user.name,
          email: res.user.email,
          access_token: res.access_token,
          referral_code: res.user.referral_code,
          referred_by: res.user.referred_by,
          registration_date: res.user.registration_date,
        });
        router.push(AFFILIATE_DASHBOARD_PAGE_PATH);
      } else {
        toast.error(res.message);
        form.setError("root", { type: "manual", message: res.message });
        form.setValue("password", "");
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
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            {t("welcome_back_friend")}
          </CardTitle>
          <CardDescription>
            {t("we_are_so_glad_to_see_you_login_to_continue")}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")} *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("enter_your_email_address")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")} *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("enter_your_password")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex flex-row-reverse items-center gap-2">
                  <Checkbox label={t("remember_me")} />
                </div>
                <Link href={AFFILIATE_FORGOT_PASSWORD_PAGE_PATH}>
                  {t("forgot_password")}
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                variant="blue"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? t("signing_in") : t("signin")}
              </Button>
              <Link
                href={AFFILIATE_SIGNUP_PAGE_PATH}
                className="text-sm font-semibold"
              >
                {t("do_not_have_any_account_sign_up")}
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Section>
  );
};

export default memo(AffiliateLogin);
