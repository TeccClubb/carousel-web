import { cn } from "@/lib/utils";
import React, { FC, memo, ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { Check, Copy } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";

const ReportCard: FC<{
  title: string;
  icon: ReactNode;
  value: string | number;
  isValueCopyAble?: boolean;
  isLoading: boolean;
  valueClassName?: string;
}> = ({ title, icon, value, isValueCopyAble, isLoading, valueClassName }) => {
  const { copiedValue, handleCopy } = useClipboard();
  return (
    <Card className="flex justify-between shadow-md">
      <CardHeader className="flex-1 pr-2">
        <CardTitle className="text-base leading-7 font-medium">
          {title}
        </CardTitle>
        <CardDescription>
          {isLoading && <Skeleton className="h-4 w-32" />}
          {!isLoading && !isValueCopyAble && (
            <Label asSpan className={cn("text-xl font-medium", valueClassName)}>
              {value}
            </Label>
          )}
          {!isLoading && isValueCopyAble && (
            <Button
              size="sm"
              onClick={() => handleCopy(String(value))}
              className={cn(
                "bg-indigo-100 hover:bg-indigo-50 text-primary rounded-full h-6 text-md font-normal",
                valueClassName
              )}
            >
              <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-28">
                {value}
              </span>
              {copiedValue === value && (
                <span className="flex items-center w-max">
                  <Check className="size-4" />
                  copied
                </span>
              )}
              {copiedValue !== value && <Copy />}
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-0 pr-6">
        <span className="text-white bg-blue p-4 rounded-full">
          {icon}
        </span>
      </CardFooter>
    </Card>
  );
};

export default memo(ReportCard);
