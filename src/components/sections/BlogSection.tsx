"use client";
import React, { FC, memo, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Section from "./Section";
import { useTranslations } from "next-intl";
import axios, { AxiosError } from "axios";
import { GET_BLOGS_ROUTE } from "@/constant";
import { getFormattedDate } from "@/lib/utils";
import { SkeletonCard } from "../elements";

const BlogSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const t = useTranslations();
  type Blog = {
    link: string;
    image: string;
    category: string;
    title: string;
    created_at: string;
    updated_at: string;
  };
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios
          .get<{
            status: boolean;
            message: string;
            blogs: Blog[];
          }>(GET_BLOGS_ROUTE, {
            headers: { Accept: "application/json" },
          })
          .then((res) => res.data);

        if (res.status) {
          setBlogs(res.blogs);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          //do something if needed
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
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
            blogs.map((blog, index) => (
              <BlogCard
                key={`${blog.link} ${index}`}
                link={blog.link}
                imageSrc={blog.image}
                category={blog.category}
                title={blog.title}
                date={getFormattedDate(blog.created_at)}
              />
            ))}
        </div>
      </div>
    </Section>
  );
};

export default memo(BlogSection);
