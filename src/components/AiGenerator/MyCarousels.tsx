import React, { FC } from "react";
import { Button } from "../ui";
import { LOGIN_PAGE_PATH } from "@/pathNames";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const MyCarousels: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 items-center">
          <div className="pb-2 flex">
            <Button size="sm">
              <Plus />
              {t("my_carousels_panel_new_carousel_btn_text")}
            </Button>
          </div>
          <div className="border rounded p-2 flex flex-col items-center">
            <div className="text-center text-muted-foreground">
              {t("my_carousels_panel_message")}
            </div>
            <Button onClick={() => router.push(LOGIN_PAGE_PATH)}>
              {t("login_btn_text")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarousels;
