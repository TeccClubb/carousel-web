import { InfoIcon, CheckedCircleIcon } from "@/icons";
import { ReactNode } from "react";
import { toast } from "sonner";

export const useToast = () => ({
  custom: (children: ReactNode) => toast(<>{children}</>),
  success: (message: string) =>
    toast(
      <>
        <CheckedCircleIcon style={{ color: "green" }} />
        <span style={{ color: "green" }}>{message}</span>
      </>
    ),
  error: (message: string) =>
    toast(
      <>
        <InfoIcon style={{ color: "red" }} />
        <span style={{ color: "red" }}>{message}</span>
      </>
    ),
  dismiss: (id: string | number) => toast.dismiss(id),
});
