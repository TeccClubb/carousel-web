"use client";
import React, { FC, memo, ReactNode } from "react";
import SideBar from "./SideBar";
import { ScrollArea } from "../ui/scroll-area";

const Dashboard: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="min-h-[calc(100vh-4rem)] flex items-start gap-0 overflow-hidden">
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:z-50 min-h-[calc(100vh-4rem)]">
      <SideBar />
    </div>
    <ScrollArea
      className="h-[calc(100vh-4rem)] flex-1 lg:border-x"
      style={{
        background: "linear-gradient(114deg, #F0F6FD 74.59%, #FFF 99.91%)",
      }}
    >
      <div className="py-10 lg:px-8 md:px-6 px-4 flex flex-col space-y-8">
        {children}
      </div>
    </ScrollArea>
  </div>
);

export default memo(Dashboard);
