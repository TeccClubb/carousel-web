"use client";
import React, { FC, memo, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Section from "./Section";
import { useTranslations } from "next-intl";
import axios, { AxiosError } from "axios";
import { GET_BLOGS_ROUTE } from "@/constant";
import { getFormattedDate } from "@/lib/utils";
import { SkeletonCard } from "../elements";
import { useToast } from "@/hooks/use-sonner-toast";
import { BLOGS_PAGE_PATH } from "@/pathNames";
import { Blog } from "@/types";

const BlogSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const t = useTranslations();
  const toast = useToast();

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

  return (
    <Section
      isHeroSection={isHeroSection}
      showGradient={showGradient}
      cornerGradient={cornerGradient}
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

        <div className="flex flex-wrap w-full relative">
          <div className="absolute left-1/2 top-[6%] right-1/2 transform -translate-x-1/2 w-full h-[25em] bg-[#0F73F6] opacity-10 blur-3xl rounded-full"></div>
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {!isLoading && blogs.length === 0 && (
            <div className="text-center text-muted-foreground">
              {t("no_data_found")}
            </div>
          )}

          {!isLoading &&
            blogs.length !== 0 &&
            blogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                link={BLOGS_PAGE_PATH + "/" + blog.slug}
                imageSrc={blog.image}
                category={blog.category}
                title={blog.title}
                date={getFormattedDate(blog.published_at)}
              />
            ))}
        </div>
      </div>
    </Section>
  );
};

export default memo(BlogSection);
