import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { FC, memo } from "react";

const ProjectCard: FC<{
  link: string;
  imageSrc: string;
  title: string;
  onClick?: () => void;
}> = ({ link, imageSrc, title, onClick }) => (
  <div className="w-full flex justify-start items-start">
    <Link
      href={link}
      onClick={onClick}
      className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col items-start rounded-2xl w-full shadow-lg transition duration-300"
    >
      <Image
        className="rounded-t-2xl w-full h-auto"
        src={imageSrc}
        alt={title}
        width={0}
        height={0}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={imageSrc}
      />
      <span className="text-gray-900 dark:text-white px-2 py-4 text-lg font-bold">
        {title}
      </span>
    </Link>
  </div>
);

export default memo(ProjectCard);
