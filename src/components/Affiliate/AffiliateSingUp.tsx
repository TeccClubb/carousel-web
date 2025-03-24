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
import { Link } from "@/i18n/navigation";
import { passwordPattern } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { AFFILIATE_SIGNUP_ROUTE } from "@/constant";
import { Loader2 } from "lucide-react";

const AffiliateSingUp: FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const formSchema = z
    .object({
      name: z
        .string()
        .min(1, { message: t("enter_your_full_name") })
        .regex(/^[A-Za-z ]+$/, {
          message: t("name_invalid_error"),
        })
        .min(3, { message: t("name_min_length_error") }),

      email: z
        .string()
        .min(1, {
          message: t("enter_your_email_address"),
        })
        .email({
          message: t("email_invalid_error"),
        }),

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
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setSuccessMessage("");
      setLoading(true);
      const res = await axios
        .post<{ status: boolean; message: string }>(
          AFFILIATE_SIGNUP_ROUTE,
          {
            name: values.name,
            email: values.email,
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
        setSuccessMessage(res.message);
        form.reset();
        form.setFocus("name");
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
      <Card className="mt-8">
        <CardHeader>
          <CardDescription>
            {t(
              "earn_a_40_percent_commission_on_all_payments_from_customers_you_refer_to"
            )}{" "}
            carouselbuilder.io
          </CardDescription>
        </CardHeader>
        <Separator />
        {successMessage && (
          <CardContent className="flex flex-col pt-8 space-y-4 text-center">
            <div className="text-green-800 bg-green-300/50 border-2 border-solid border-green-300 p-2 rounded-md">
              {successMessage}
            </div>
            <Link
              href={AFFILIATE_LOGIN_PAGE_PATH}
              className="text-sm font-semibold text-[#0139FF] hover:text-[#0139FF]/90"
            >
              {t("back_to_login")}
            </Link>
          </CardContent>
        )}
        {!successMessage && (
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("full_name")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={t("enter_your_full_name")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                      <FormLabel>{t("create_password")} *</FormLabel>
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
                  {isLoading ? t("signing_up") : t("signup")}
                </Button>
                <Link
                  href={AFFILIATE_LOGIN_PAGE_PATH}
                  className="text-sm font-semibold"
                >
                  {t("already_have_an_account_login")}
                </Link>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </Section>
  );
};

export default memo(AffiliateSingUp);
