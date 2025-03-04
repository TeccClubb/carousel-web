import React, { FC, memo } from "react";
import BlogCard from "./BlogCard";
import Section from "./Section";
import { useTranslations } from "next-intl";

const BlogSection: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  cornerGradient?: "left" | "right";
}> = ({ isHeroSection, showGradient, cornerGradient }) => {
  const t = useTranslations();
  const blogs = [
    {
      link: "/blog-link",
      imageSrc: "/apple-watches.jpg",
      category: "TYPOGRAPHY",
      title: "Mastering the Art of Typography: Tips for Eye-Catching Designs",
      date: "5 APRIL 2024",
    },
    {
      link: "/blog-link",
      imageSrc: "/apple-watches.jpg",
      category: "TYPOGRAPHY",
      title: "Mastering the Art of Typography: Tips for Eye-Catching Designs",
      date: "5 APRIL 2024",
    },
    {
      link: "/blog-link",
      imageSrc: "/apple-watches.jpg",
      category: "TYPOGRAPHY",
      title: "Mastering the Art of Typography: Tips for Eye-Catching Designs",
      date: "5 APRIL 2024",
    },
  ];

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
          {blogs.map((blog, index) => (
            <BlogCard
              key={`${blog.link} ${index}`}
              link={blog.link}
              imageSrc={blog.imageSrc}
              category={blog.category}
              title={blog.title}
              date={blog.date}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default memo(BlogSection);
