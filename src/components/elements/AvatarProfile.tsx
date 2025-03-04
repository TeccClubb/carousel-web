import React, { FC, memo } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui";
import { useUserState } from "@/hooks/use-user-state";
import { logout } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app.slice";
import { useToast } from "@/hooks/use-sonner-toast";
import { TOKEN_LOCAL_STORAGE_KEY } from "@/constant";
import { setUserData } from "@/store/user.slice";
import { useTranslations } from "next-intl";

const AvatarProfile: FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const toast = useToast();
  const { userData: user } = useUserState();
  const loadingSetter = ({
    isLoading,
    title,
  }: {
    isLoading: boolean;
    title?: string;
  }) => {
    dispatch(setLoading({ isLoading, title }));
  };

  const onSuccess = (message: string) => {
    toast.success(message);
    dispatch(setUserData(null));
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  };

  const onError = (message: string) => {
    toast.error(message);
  };

  const handleLogout = () =>
    logout({
      access_token: user!.access_token,
      loadingSetter,
      onSuccess,
      onError,
    });
  return (
    <Popover>
      <PopoverTrigger asChild>
        {user && (
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex items-center justify-start gap-3">
        {user && (
          <>
            <Avatar className="size-16 transition-all hover:scale-105">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{user.name}</span>
              <span>{user.email}</span>
            </div>
            <Button
              className="ml-3"
              variant="destructive"
              onClick={handleLogout}
            >
              {t("logout")}
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default memo(AvatarProfile);
