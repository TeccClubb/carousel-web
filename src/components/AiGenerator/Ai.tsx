import React, { FC, memo, useState } from "react";
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
import axios, { AxiosError } from "axios";
import { OPENAI_API_ENDPOINT, OPENAI_API_KEY } from "@/constant";
import { useToast } from "@/hooks/use-sonner-toast";
import { Loader2 } from "lucide-react";
import { useCarouselsState } from "@/hooks/use-carousels-state";
import { ratios } from "@/assets/ratios";
import { useDispatch } from "react-redux";
import {
  setAiPanelSelectedTab,
  setAiText,
  setAiTopic,
  setAiTotalSlides,
  setAiURL,
  setSlides,
} from "@/store/carousels.slice";
import { useLocale } from "next-intl";

const Ai: FC = () => {
  const dispatch = useDispatch();

  const defaultLocale = useLocale();

  const {
    aiPanel: { topic, text, url, totalSlides, selectedTab },
    carousel: {
      data: {
        slideRatio: { ratioId },
      },
    },
  } = useCarouselsState();

  const [locale, setLocale] = useState<string>(defaultLocale);
  const language = languages.find((lang) => lang.locale === locale)?.name;
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);

  const contentType = ratios.find((ratio) => ratio.ratioId === ratioId)!.name;

  const textMaxLength = 8000;

  const handleGenerate = async () => {
    const command = `make ${totalSlides} carousel sliders for ${contentType} on ${
      selectedTab === "topic"
        ? `${topic} topic`
        : selectedTab === "text"
        ? text
        : selectedTab === "url"
        ? `about article or blog from url ${url}`
        : ""
    } , give me response in ${language} as json object array only, have subTitle, title and description, show only array no need any details`;
    try {
      setLoading(true);
      const response = await axios.post(
        OPENAI_API_ENDPOINT,
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: command,
            },
          ],
          max_tokens: 2048,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData: {
        subTitle: string;
        title: string;
        description: string;
      }[] = JSON.parse(
        response.data.choices[0].message.content
          .replace("```json", "")
          .replace("```", "")
      );
      dispatch(setSlides(jsonData));
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof AxiosError
          ? error.message
          : "Something went wrong while generating AI content"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <form className="space-y-4">
        <div className="bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Tabs
            defaultValue={selectedTab}
            onValueChange={(value) => dispatch(setAiPanelSelectedTab(value))}
          >
            <TabsList>
              <TabsTrigger value="topic">Topic</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="topic">
              <div className="space-y-2">
                <Input
                  label="Topic"
                  type="text"
                  value={topic}
                  onChange={(e) => dispatch(setAiTopic(e.target.value))}
                  placeholder="Enter a topic"
                />
              </div>
            </TabsContent>
            <TabsContent value="text">
              <Textarea
                value={text}
                onChange={(e) => dispatch(setAiText(e.target.value))}
                rows={5}
                maxLength={textMaxLength}
                placeholder="Paste your text content here, not URLs (e.g., article, notes)"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {text.length}/{textMaxLength}
              </p>
            </TabsContent>
            <TabsContent value="url">
              <div className="space-y-2">
                <Input
                  label="Article or Blog URL"
                  type="text"
                  value={url}
                  onChange={(e) => dispatch(setAiURL(e.target.value))}
                  placeholder="Article or Blog URL"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="space-y-2">
              <Input
                label="Total Slides"
                type="number"
                placeholder="How many slides?"
                min={4}
                value={totalSlides}
                onChange={(e) => dispatch(setAiTotalSlides(+e.target.value))}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <Combobox
                label="Language"
                value={locale}
                onValueChange={(value) => setLocale(value)}
                text={languages.find((lang) => lang.locale === locale)!.label}
                tickSide="left"
                emptyMessage="No language found"
                placeholder="Select Language"
                size="md"
                className="w-full"
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

        <Button
          size="sm"
          type="submit"
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && (
            <>
              <Loader2 className="animate-spin" />
              &nbsp;Generating...
            </>
          )}
          {!isLoading && "Generate carousel with AI"}
        </Button>
      </form>
    </div>
  );
};

export default memo(Ai);
