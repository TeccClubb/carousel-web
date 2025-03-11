import { TickIcon } from "@/icons";
import React, { FC, memo } from "react";
import { Button } from "../ui";

const PriceCard: FC<{
  heading: string;
  price: number;
  duration: number;
  durationUnit: string;
  features: string[];
  isBestPrice?: boolean;
  onGetPlan: (heading: string, price: number) => void;
}> = ({
  heading,
  price,
  duration,
  durationUnit,
  features = [],
  isBestPrice,
  onGetPlan,
}) => (
  <div className="w-full lg:w-1/3 md:w-1/2 p-4">
    <div
      className={`bg-slate-50 dark:bg-gray-800 ${
        isBestPrice
          ? "border-2 border-solid border-blue-600 dark:bg-gray-800"
          : "md:mt-10 border-none"
      } flex relative p-8 flex-col items-start gap-8 rounded-md shadow-lg transition duration-300`}
    >
      {isBestPrice && (
        <span className="uppercase text-white bg-blue-600 py-2 px-3 absolute top-4 right-4 font-[Libre Franklin] text-xs font-bold leading-normal inline-block rounded-full">
          BEST SELLER
        </span>
      )}
      <p className="text-black dark:text-white font-plus-jakarta-sans text-xl font-bold leading-7 transition duration-300">
        {heading}
      </p>
      <div className="flex gap-x-2">
        <h2 className="text-black dark:text-white font-plus-jakarta-sans text-4xl font-bold leading-[58px] transition duration-300">
          ${price}
        </h2>
        <h5 className="text-black dark:text-white mt-6 font-libre-franklin text-base font-normal leading-[24px] opacity-50 transition duration-300">
          / {duration > 1 && duration} {durationUnit}
        </h5>
      </div>

      <div className="h-px self-stretch bg-[rgba(34,34,34,0.15)]"></div>

      <div className="flex flex-col items-start gap-10 w-full">
        <div className="text-black dark:text-white flex flex-col gap-y-4 font-['Libre Franklin'] text-base font-normal leading-6 transition duration-300">
          {features.map((feature) => (
            <div key={feature} className="flex gap-x-3">
              <TickIcon /> <span>{feature}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={() => onGetPlan(heading, price)}
          className={`${
            isBestPrice
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-600 hover:bg-blue-300"
          }  font-[Libre Franklin] text-base font-bold leading-6 w-full px-10 py-5 rounded-lg`}
        >
          Get This Plan
        </Button>
      </div>
    </div>
  </div>
);

export default memo(PriceCard);
