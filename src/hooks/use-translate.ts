import { useEffect, useState } from "react";
import { languages } from "@/assets/languages";
import { useLocale } from "next-intl";
import axios from "axios";
import { OPENAI_API_ENDPOINT, OPENAI_API_KEY } from "@/constant";
import { useToast } from "./use-sonner-toast";

export const useTranslate = ({
  data,
  requiredResponse,
  onTranslate,
  extraDependencies = [],
}: {
  data: string;
  requiredResponse: "html" | "json";
  onTranslate?: (translatedData: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraDependencies?: any[];
}) => {
  const toast = useToast();
  const locale = useLocale();
  const language = languages.find((lang) => lang.locale === locale)!;
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translatedData, setTranslatedData] = useState<string>("[]");

  const command = `${data} translate into ${
    language.name
  }, give me response as ${
    requiredResponse === "html" ? "html" : "json object array"
  } only no need any details`;

  useEffect(() => {
    const translate = async () => {
      try {
        const invalidValues = ["[]", "{}", "null", "undefined", "false"];
        if (!data || invalidValues.includes(data) || locale === "en") {
          setTranslatedData(data);
          return;
        }

        setIsTranslating(true);
        const res = await axios.post(
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

        const tData = res.data.choices[0].message.content
          .replace("json", "")
          .replace("html", "")
          .replace("```", "")
          .replace("```", "");

        setTranslatedData(tData);

        if (onTranslate) onTranslate(tData);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to translate"
        );
      } finally {
        setIsTranslating(false);
      }
    };
    translate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, ...extraDependencies]);

  return { translatedData, isTranslating } as const;
};
