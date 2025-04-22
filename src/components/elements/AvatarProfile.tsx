import React, { FC, memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserCookie } from "@/hooks/use-cookie";
import { useTranslations } from "next-intl";
import { useAppState } from "@/hooks/use-app-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PRICING_PAGE_PATH } from "@/pathNames";
import { Link } from "@/i18n/navigation";
import { useLogout } from "@/hooks/use-logout";
import { LogOut } from "lucide-react";
import BillingIcon from "@/icons/BillingIcon";
import Image from "next/image";

const AvatarProfile: FC = () => {
  const t = useTranslations();
  const { isAppMounted } = useAppState();
  const { user } = useUserCookie();
  const { handleUserLogout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAppMounted && user && (
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          {isAppMounted && user && (
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.name}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={PRICING_PAGE_PATH}>
            <BillingIcon />
            {t("billing")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={PRICING_PAGE_PATH}>
          <Image
             src={"/dollor2.svg"}
             width={20}
             height={20}
             alt="dolor Img"
             
             >

             </Image>
            {t("manage_subscription")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={PRICING_PAGE_PATH}>
          <Image
             src={"/dollor3.svg"}
             width={20}
             height={20}
             alt="dolor Img"
             
             >

             </Image>
            {t("manage_affiliate")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleUserLogout}
          className="text-destructive"
        >
          <LogOut className="-scale-100" />
          {t("signout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(AvatarProfile);
