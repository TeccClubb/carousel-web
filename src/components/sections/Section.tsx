import React, { FC, ReactNode } from "react";

const Section: FC<{
  isHeroSection?: boolean;
  showGradient?: boolean;
  className?: string;
  children: ReactNode;
}> = ({ isHeroSection, showGradient, className, children }) => {
  return (
    <section
      className={`flex items-center justify-center bg-cover bg-center w-full ${
        isHeroSection ? "min-h-screen lg:pt-16" : "h-auto"
      } ${
        showGradient
          ? "bg-gradient-to-r from-[#F0F6FD] to-[#FFFFFF] bg-transparent"
          : ""
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-center w-full max-w-7xl ${
          isHeroSection ? "p-4" : "px-4 py-12 lg:py-14"
        } mx-auto z-0  ${className ? className : ""}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
