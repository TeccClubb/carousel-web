import React, { FC } from "react";
import BlogCard from "./BlogCard";
import Section from "./Section";

const BlogSection: FC<{ isHeroSection?: boolean; showGradient?: boolean }> = ({
  isHeroSection,
  showGradient,
}) => {
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
    <Section isHeroSection={isHeroSection} showGradient={showGradient}>
      <div className="flex flex-col gap-y-8">
        <div className="text-center">
          <span className="text-[#0F73F6] text-base font-medium">BLOG</span>
          <h1 className="text-gray-900 dark:text-white xl:text-5xl md:text-4xl text-3xl font-semibold lg:leading-[58px]">
            Latest Expert Design Tips & Insights
          </h1>
        </div>

        <div className="flex flex-wrap w-full">
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

export default BlogSection;
