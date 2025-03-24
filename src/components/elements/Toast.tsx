import React, { memo, ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

const Toast: React.FC<{
  children?: ReactNode;
  action?: ButtonProps & {
    label: string;
    icon?: ReactNode;
  };
}> = ({ action, children }) => {
  return (
    <>
      {children}
      {action && (
        <Button
          {...action}
          size={action?.size ?? "sm"}
          className={cn("ml-auto", action?.className)}
        >
          {action?.icon} {action?.label}
        </Button>
      )}
    </>
  );
};

export default memo(Toast);
