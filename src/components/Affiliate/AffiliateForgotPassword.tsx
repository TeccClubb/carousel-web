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
import { Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { AFFILIATE_FORGOT_PASSWORD_ROUTE } from "@/constant";

const AffiliateForgotPassword: FC = () => {
  const t = useTranslations();
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: t("enter_your_email_address"),
      })
      .email({
        message: t("email_invalid_error"),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.clearErrors();
      setSuccessMessage("");
      setLoading(true);
      const res = await axios
        .post<{ status: boolean; message: string }>(
          AFFILIATE_FORGOT_PASSWORD_ROUTE,
          { email: values.email },
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
      } else {
        toast.error(res.message);
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
            {t("forgot_your_password")}
          </CardTitle>
          <CardDescription>
            {t("it_happens_to_the_best_of_us_reset_it_below")}
          </CardDescription>
        </CardHeader>
        <Separator />
        {successMessage && (
          <CardContent className="pt-8 space-y-4">
            <div className="text-green-800 bg-green-300/50 border-2 border-solid border-green-300 p-2 rounded-md">
              {successMessage}
            </div>
          </CardContent>
        )}

        {!successMessage && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <CardContent className="pt-8 space-y-4">
                {successMessage && (
                  <div className="text-green-800 bg-green-300/50 border-2 border-solid border-green-300 p-2 rounded-md">
                    {successMessage}
                  </div>
                )}
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
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="blue"
                  className="w-full"
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  {isLoading ? t("submitting") : t("submit")}
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
        )}
      </Card>
    </Section>
  );
};

export default memo(AffiliateForgotPassword);
