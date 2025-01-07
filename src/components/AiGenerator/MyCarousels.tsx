import { AddIcon } from "@/icons";
import React, { FC } from "react";
import { Button } from "../ui";
import Link from "next/link";
import { LOGIN_PAGE_PATH } from "@/pathNames";

const MyCarousels: FC = () => {
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 items-center">
          <div className="pb-2 flex">
            <Button size="sm">
              <AddIcon />
              New Carousel
            </Button>
          </div>
          <div className="border rounded p-2 flex flex-col items-center">
            <div className="text-center text-muted-foreground">
              Login to save and view carousels
            </div>
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              href={LOGIN_PAGE_PATH}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarousels;
