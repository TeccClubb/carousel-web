"use client";
import React, { FC, memo } from "react";
import Section from "./Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
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
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

const FAQSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const t = useTranslations();

  const faqs = [
    {
      question: t("faq_question_1"),
      answer: t("faq_answer_1"),
    },
    {
      question: t("faq_question_2"),
      answer: t("faq_answer_2"),
    },
    {
      question: t("faq_question_3"),
      answer: t("faq_answer_3"),
    },
    {
      question: t("faq_question_4"),
      answer: t("faq_answer_4"),
    },
    {
      question: t("faq_question_5"),
      answer: t("faq_answer_5"),
    },
    {
      question: t("faq_question_6"),
      answer: t("faq_answer_6"),
    },
    {
      question: t("faq_question_7"),
      answer: t("faq_answer_7"),
    },
    {
      question: t("faq_question_8"),
      answer: t("faq_answer_8"),
    },
    {
      question: t("faq_question_9"),
      answer: t("faq_answer_9"),
    },
  ];

  const formSchema = z.object({
    name: z
      .string()
      .optional()
      .refine((val) => (val !== "" && val === undefined) || val.length >= 2, {
        message: t("name_min_length_error"),
      }),
    email: z
      .string()
      .min(1, {
        message: t("enter_your_email_address"),
      })
      .email({
        message: t("email_invalid_error"),
      }),

    message: z.string().min(3, {
      message: t("message_min_length_error"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    toast(t("message_sent"));
  };

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
      containerClassName="flex-col lg:flex-row gap-y-8 items-start"
    >
      <div className="w-full lg:w-1/2 px-4 lg:pr-16">
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
              <AccordionTrigger className="text-start">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-start">
                <p
                  dangerouslySetInnerHTML={{
                    __html: faq.answer.replace(/\*(.*?)\*/g, (_, text) => {
                      const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      return emailRegex.test(text)
                        ? `<strong><a href="mailto:${text}" class="text-blue-600">${text}</a></strong>`
                        : `<strong>${text}</strong>`;
                    }),
                  }}
                ></p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="w-full lg:w-1/2 px-4">
        <div className="text-center lg:text-left">
          <span className="text-[#0F73F6] text-base font-medium">
            {t("faq_section_description")}
          </span>
          <h1 className="text-gray-900 dark:text-white lg:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            {t("faq_section_heading")}
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={`${t("what_is_your_name")} (${t(
                        "optional"
                      )})`}
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
                  <FormLabel>{t("email_address")} *</FormLabel>
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("question")} *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("type_here_your_question")}
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-blue-200 text-blue-600 hover:bg-blue-300 text-base font-bold leading-6 self-end px-10 py-5 rounded-lg"
            >
              {t("ask_us_a_question")}
            </Button>
          </form>
        </Form>
      </div>
    </Section>
  );
};

export default memo(FAQSection);
