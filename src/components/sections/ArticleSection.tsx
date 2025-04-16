import React, { FC, ReactNode } from "react";
import Section from "./Section";
import { Loader2 } from "lucide-react";

const ArticleSection: FC<{
  heading: string;
  htmlContent?: string;
  errorMessage?: string;
  isLoading?: boolean;
  isTranslating?: boolean;
  children?: ReactNode;
}> = ({
  heading,
  htmlContent,
  errorMessage,
  isLoading,
  isTranslating,
  children,
}) => (
  <Section showGradient isHeroSection containerClassName="flex-col gap-4 py-10">
    <h2 className="text-4xl sm:text-5xl font-bold">{heading}</h2>
    {(isLoading || isTranslating) && (
      <span className="mt-4 flex items-center justify-center">
        <Loader2 className="animate-spin size-8 mr-2" />
        {isLoading && "Loading..."}
        {isTranslating && "Translating..."}
      </span>
    )}

    {errorMessage && (
      <span className="mt-4 text-red-500 font-semibold text-sm">
        {errorMessage}
      </span>
    )}

    {children && (
      <article className="w-full max-w-7xl prose prose-neutral dark:prose-invert">
        {children}
      </article>
    )}

    {htmlContent && (
      <article
        className="w-full max-w-7xl prose prose-neutral dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></article>
    )}
  </Section>
);

export default ArticleSection;
