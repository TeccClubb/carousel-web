"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Section from "./Section";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-sonner-toast";
import axios, { AxiosError } from "axios";
import { Blog } from "@/types";
import { GET_BLOGS_ROUTE } from "@/constant";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import BlogCard from "./BlogCard";
import { BLOGS_PAGE_PATH } from "@/pathNames";
import { getFormattedDate } from "@/lib/utils";
import { SkeletonCard } from "../elements";

const BlogSliderSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const t = useTranslations();
  const toast = useToast();

  const [api, setApi] = useState<CarouselApi>();
  const [currentBlogIndex, setCurrentBlogIndex] = useState<number>(0);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios
          .get<{
            data: Blog[];
            links: {
              first: string;
              last: string;
              next: string | null;
              prev: string | null;
            };
            meta: {
              current_page: number;
              from: number;
              to: number;
              last_page: number;
              path: string;
              per_page: number;
              total: number;
              links: {
                active: boolean;
                label: string;
                url: string | null;
              }[];
            };
          }>(GET_BLOGS_ROUTE, {
            headers: { Accept: "application/json" },
          })
          .then((res) => res.data);

        if (res) {
          setBlogs(res.data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.message || t("something_went_wrong")
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      setCurrentBlogIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
      containerClassName="flex-col gap-y-6"
    >
      <div className="flex flex-col gap-y-8">
        <div className="text-center">
          <span className="text-[#0F73F6] text-base font-medium">
            {t("blog")}
          </span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            {t("blog_section_description")}
          </h1>
        </div>
      </div>

      {!isLoading && blogs.length === 0 && (
        <div className="text-center text-muted-foreground">
          {t("no_data_found")}
        </div>
      )}

      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full max-w-7xl px-4 overflow-hidden"
      >
        <CarouselContent className="w-[20em] sm:w-[25em] -ml-2">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <SkeletonCard />
              </CarouselItem>
            ))}

          {!isLoading &&
            blogs.length !== 0 &&
            blogs.map((blog) => (
              <CarouselItem key={blog.slug} className="pl-0">
                <BlogCard
                  link={BLOGS_PAGE_PATH + "/" + blog.slug}
                  imageSrc={blog.image}
                  category={blog.category}
                  title={blog.title}
                  date={getFormattedDate(blog.published_at)}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      <ul className="flex flex-wrap gap-2.5">
        {!isLoading &&
          blogs.length !== 0 &&
          blogs.map((_, index) => (
            <li
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`size-[0.75rem] cursor-pointer rounded-[50%] duration-300 ${
                currentBlogIndex === index ? "bg-primary" : "bg-indigo-200"
              }`}
            ></li>
          ))}
      </ul>
    </Section>
  );
};

export default BlogSliderSection;
