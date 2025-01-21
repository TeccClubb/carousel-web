import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui";
import { useUserData } from "@/hooks";

const AvatarProfile: FC = () => {
  const userData = useUserData();
  return (
    <Avatar>
      <AvatarImage src={userData?.picture ?? ""} />
      <AvatarFallback>{userData?.given_name}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
