"use client";
import React, { FC, memo, Suspense } from "react";
import { DownloadCarousel } from "@/components";
import "../globals.css";

const DownloadCarouselPage: FC = () => (
  <Suspense>
    <DownloadCarousel />
  </Suspense>
);

export default memo(DownloadCarouselPage);
