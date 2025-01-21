import React, { FC } from "react";
import { Button } from "../ui";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useLoginToken } from "@/hooks";
import { setUserData } from "@/store";

const LogoutButton: FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const dispatch = useDispatch();
  const { removeLoginToken } = useLoginToken();
  const handleLogout = () => {
    googleLogout();
    removeLoginToken();
    dispatch(setUserData(null));
    if (onLogout) onLogout();
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
};

export default LogoutButton;
