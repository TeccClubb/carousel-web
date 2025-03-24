import { useState } from "react";
import { useToast } from "./use-sonner-toast";

export const useClipboard = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const toast = useToast();
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => {
        setCopiedValue(null);
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while coping"
      );
    }
  };
  return { copiedValue, handleCopy } as const;
};
