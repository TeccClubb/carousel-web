"use client";

import React, { FC, useEffect, useState } from "react";
import Section from "@/components/sections/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GET_BLOG_ROUTE } from "@/constant";
import { htmlContent } from "@/lib/utils";
import { Blog } from "@/types";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-sonner-toast";

const PostPage: FC = () => {
  const slug = useParams().slug;
  const t = useTranslations();
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get<{ data: Blog }>(GET_BLOG_ROUTE(slug), {
          headers: { Accept: "application/json" },
        });

        if (res.status === 200) {
          setBlog(res.data.data);
        } else {
          throw new Error("Failed to fetch blog");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data.message;
          setErrorMessage(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section
      isHeroSection
      showGradient
      containerClassName="flex-col lg:flex-row gap-8 items-start"
    >
      <div className="flex-1 flex flex-col items-center gap-8">
        {errorMessage && <h1 className="text-3xl font-bold">{errorMessage}</h1>}
        {isLoading && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-16 bg-gray-200 animate-pulse" />
            <div className="w-full h-32 bg-gray-200 animate-pulse" />
            <div className="w-full h-20 bg-gray-200 animate-pulse" />
          </div>
        )}

        {blog && (
          <article className="w-full max-w-7xl prose prose-neutral dark:prose-invert">
            <h1>{blog.title}</h1>
            <Image
              src={blog.image}
              alt={t("image_not_founded")}
              width={100}
              height={100}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={blog.image}
              className="w-full max-w-lg rounded-2xl h-auto object-cover transition-all hover:scale-105 aspect-square border"
            />
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent(blog.content) }}
            ></div>
          </article>
        )}
      </div>
      <div className="w-full lg:max-w-80">
        {isLoading && <div className="w-full h-36 bg-gray-200 animate-pulse" />}
        {blog && (
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </Section>
  );
};

export default PostPage;
