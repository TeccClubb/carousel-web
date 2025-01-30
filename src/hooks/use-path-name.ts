import { usePathname as usePathName } from "next/navigation";

export const usePathname = () => {
  const pathname = usePathName();
  return pathname.replace(/^\/[a-z]{2}\/?/, "/");
};
