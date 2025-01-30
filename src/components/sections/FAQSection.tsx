"use client";
import React, { FC } from "react";
import Section from "./Section";
import { FAQ } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "../ui";
import { toast } from "@/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const FAQSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const { t } = useTranslation();
  const faqs: FAQ[] = [
    {
      question: "Can I request a refund?",
      answer: "",
    },
    {
      question: "How do I access my purchased products?",
      answer:
        "Accessing your purchased products is seamless and hassle-free on our digital design marketplace. Simply log in to your account, navigate to the 'My Purchases' section.",
    },
    {
      question: "Are there any discounts for bulk purchases?",
      answer: "",
    },
    {
      question: "What payment methods do you accept here?",
      answer: "",
    },
    {
      question: "Can I sell my digital products on this marketplace?",
      answer: "",
    },
  ];

  const formSchema = z.object({
    name: z
      .string()
      .optional()
      .refine((val) => (val !== "" && val === undefined) || val.length >= 2, {
        message: "name must be at least 3 characters.",
      }),
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email({
        message: "Invalid email format.",
      }),

    message: z.string().min(3, {
      message: "message must be at least 3 characters.",
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

    toast({
      description: "Your message has been sent.",
    });
  };

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
      className="flex-col lg:flex-row gap-y-8"
    >
      <div className="w-full lg:w-1/2 px-4 lg:pr-16 self-start">
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="w-full lg:w-1/2 px-4">
        <div className="text-center lg:text-left">
          <span className="text-[#0F73F6] text-base font-medium">FAQ</span>
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
                  <FormLabel>{t("faq_section_name_label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("faq_section_name_placeholder")}
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
                  <FormLabel>{t("faq_section_email_label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("faq_section_email_placeholder")}
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
                  <FormLabel>{t("faq_section_message_label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("faq_section_message_placeholder")}
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
              {t("faq_section_btn_text")}
            </Button>
          </form>
        </Form>
      </div>
    </Section>
  );
};

export default FAQSection;
