import React, { FC, useState } from "react";
import {
  Button,
  Combobox,
  ComboboxItem,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "../ui";
import { languages } from "@/assets/languages";
import { useTranslation } from "react-i18next";

const Ai: FC = () => {
  const [locale, setLocale] = useState<string>("en");
  const [text, setText] = useState<string>("");
  const textMaxLength = 8000;
  const { t } = useTranslation();
  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-4">
        <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Tabs defaultValue="topic">
            <TabsList>
              <TabsTrigger value="topic">{t("ai_topic")}</TabsTrigger>
              <TabsTrigger value="text">{t("ai_text")}</TabsTrigger>
              <TabsTrigger value="url">{t("ai_url")}</TabsTrigger>
            </TabsList>
            <TabsContent value="topic">
              <div className="space-y-2">
                <Input
                  label={t("ai_topic")}
                  type="text"
                  placeholder={t("ai_topic_placeholder")}
                />
              </div>
            </TabsContent>
            <TabsContent value="text">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                maxLength={textMaxLength}
                placeholder={t("ai_text_placeholder")}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {text.length}/{textMaxLength}
              </p>
            </TabsContent>
            <TabsContent value="url">
              <div className="space-y-2">
                <Input
                  label={t("ai_url_label")}
                  type="text"
                  placeholder={t("ai_url_placeholder")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="space-y-2">
              <Input label={t("ai_total_slides_label")} type="number" />
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <Combobox
                label={t("ai_language_label")}
                value={locale}
                onValueChange={setLocale}
                text={languages.find((lang) => lang.locale === locale)!.label}
                tickSide="left"
                emptyMessage={t("ai_language_empty_message")}
                placeholder={t("ai_language_placeholder")}
                size="md"
              >
                {languages.map((lang) => (
                  <ComboboxItem key={lang.locale} value={lang.locale}>
                    {lang.name}
                    <span className="text-xs text-gray-500">
                      &nbsp;({lang.label})
                    </span>
                  </ComboboxItem>
                ))}
              </Combobox>
            </div>
          </div>
        </div>

        <Button size="sm" className="w-full">
          {t("ai_btn_text")}
        </Button>
      </div>
    </div>
  );
};

export default Ai;
