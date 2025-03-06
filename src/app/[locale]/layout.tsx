import React, { ReactNode } from "react";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { RootLayout } from "@/components";
import { Locale } from "@/types";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale as Locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden bg-white dark:bg-gray-900 bg-background w-full min-h-screen flex flex-col transition duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <RootLayout>{children}</RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
