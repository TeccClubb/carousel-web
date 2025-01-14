import React, { FC, memo } from "react";
import Image from "next/image";
import { useBrand } from "@/hooks";

const Brand: FC<{ color: string }> = ({ color }) => {
  const brand = useBrand();
  return (
    <div
      className="flex items-center h-[5.625em] absolute left-[3.75em] bottom-[3.75em] z-50"
      style={{ color }}
    >
      <div className="flex items-center">
        <span className="w-[6em] h-[6em] mr-[1em] rounded-[5em] shrink-0">
          <Image
            className="aspect-square h-full w-full object-cover rounded-full"
            src={brand.profileImage}
            alt="Image not founded"
            width={120}
            height={120}
            sizes="100vw"
            priority
          />
        </span>
        <div className="flex flex-col items-start justify-center relative z-[1]">
          <div className="text-[2em] font-semibold leading-[1.1]">
            {brand.name}
          </div>
          <div className="text-[1.75em] font-normal opacity-90">
            {brand.handle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Brand);
