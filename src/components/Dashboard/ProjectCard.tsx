import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { FC, memo } from "react";

const ProjectCard: FC<{
  link: string;
  imageSrc: string;
  title: string;
  onClick?: () => void;
}> = ({ link, imageSrc, title, onClick }) => {
  return (
    // <div className="p-4 w-full lg:w-1/3 sm:w-1/2">
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
};

export default memo(ProjectCard);

// import Image from "next/image";
// import { Link } from "@/i18n/navigation";
// import React, { FC } from "react";

// const ProjectCard: FC<{ link: string; imgSrc: string; title: string }> = ({link, imgSrc, title}) => {
//   return (
//     // <div className="flex flex-col space-y-2 w-96">
//     //   <Image
//     //     className="rounded-xl w-full h-auto"
//     //     src="/home-section-image.jpg"
//     //     alt={t("image_not_founded")}
//     //     width={0}
//     //     height={0}
//     //     sizes="100vw"
//     //     priority
//     //   />
//     // </div>

//     <div className="p-4 w-full lg:w-1/3 sm:w-1/2">
//     <Link href={link} className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 w-full flex flex-col items-start gap-8 p-5 flex-shrink-0 mx-auto rounded-2xl shadow-lg transition duration-300">
//       <div className="w-full relative">
//         <Image
//           className="rounded-xl w-full h-auto"
//           src={imgSrc}
//           alt={title}
//           width={0}
//           height={0}
//           sizes="100vw"
//           priority
//         />
//         <h5 className="text-white bg-blue left-2.5 bottom-[-15px] absolute uppercase text-base font-normal leading-6 px-5 py-1 rounded-full">
//           {"category"}
//         </h5>
//       </div>
//       <span className="text-gray-900 dark:text-white text-lg font-bold">
//         {title}
//       </span>
//       <span className="text-gray-900 dark:text-white text-base font-normal opacity-50">
//         {"date"}
//       </span>
//     </Link>
//   </div>

//   );
// };

// export default ProjectCard;
