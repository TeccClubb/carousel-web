import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import axios, { AxiosError } from "axios";
import { UPLOAD_IMAGE_ROUTE } from "@/constant";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-sonner-toast";
import { Loader2 } from "lucide-react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label?: React.ReactNode }
>(({ label, className, type, ...props }, ref) => {
  const id = React.useId();
  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </>
  );
});
Input.displayName = "Input";

const ImageInput: React.FC<
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "placeholder" | "onChange"
  > & {
    label?: React.ReactNode;
    oldImageUrl: string;
    onImageSelect: (imageSrc: string) => void;
  }
> = ({ label, oldImageUrl, onImageSelect, ...props }) => {
  const t = useTranslations();
  const toast = useToast();
  const [isUploading, setIsUploading] = React.useState(false);

  const handleImageChoose = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg"
      ) {
        try {
          setIsUploading(true);
          const formData = new FormData();
          formData.append("image", file);
          if (oldImageUrl.startsWith("http")) {
            formData.append("old_url", oldImageUrl);
          }
          const res = await axios
            .post<{ status: boolean; url: string }>(
              UPLOAD_IMAGE_ROUTE,
              formData
            )
            .then((res) => res.data);
          if (res.status) {
            onImageSelect(res.url);
          }
        } catch (error) {
          toast.error(
            error instanceof AxiosError
              ? error.message
              : "Something went wrong while uploading image"
          );
        } finally {
          setIsUploading(false);
        }
      } else {
        toast.error(t("invalid_image_select_error_message"));
      }
    }
  };
  return (
    <>
      <Input
        label={label}
        onChange={handleImageChoose}
        value=""
        type="file"
        accept="image/*"
        {...props}
      />
      {isUploading && (
        <span className="text-xs flex gap-2 my-2">
          <Loader2 className="animate-spin size-4" />
          {t("uploading")}
        </span>
      )}
    </>
  );
};

export { Input, ImageInput };
