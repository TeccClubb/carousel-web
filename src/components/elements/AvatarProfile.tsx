import React, { FC, memo } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui";
import { useUserCookie } from "@/hooks/use-cookie";
import { useTranslations } from "next-intl";
import LogoutButton from "./LogoutButton";
import { useAppState } from "@/hooks/use-app-state";

const AvatarProfile: FC = () => {
  const t = useTranslations();
  const { isClient } = useAppState();
  const { user } = useUserCookie();

  return (
    <Popover>
      <PopoverTrigger asChild>
        {isClient && user && (
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex items-center justify-start gap-3">
        {isClient && user && (
          <>
            <Avatar className="size-16 transition-all hover:scale-105">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{user.name}</span>
              <span>{user.email}</span>
            </div>
            <LogoutButton className="ml-3">{t("logout")}</LogoutButton>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default memo(AvatarProfile);
