import React, { FC } from "react";
import { Combobox, ComboboxItem } from "../ui";
import { Languages } from "lucide-react";

const SelectLanguage: FC<{
  label?: string;
  showIcon?: boolean;
  language: string;
  setLanguage: (language: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ label, showIcon = false, language, setLanguage, size, className }) => {
  const icon = <Languages className="h-5 w-5" />;
  const options = [
    {
      value: "en",
      label: "English",
      description: "English",
    },
    {
      value: "es",
      label: "Spanish",
      description: "Español",
    },
    {
      value: "fr",
      label: "French",
      description: "Français",
    },
    {
      value: "de",
      label: "German",
      description: "Deutsch",
    },
    {
      value: "zh",
      label: "Chinese",
      description: "中文",
    },
    {
      value: "ja",
      label: "Japanese",
      description: "日本語",
    },
    {
      value: "ru",
      label: "Russian",
      description: "Русский",
    },
    {
      value: "ar",
      label: "Arabic",
      description: "العربية",
    },
    {
      value: "pt",
      label: "Portuguese",
      description: "Português",
    },
    {
      value: "hi",
      label: "Hindi",
      description: "हिन्दी",
    },
    {
      value: "it",
      label: "Italian",
      description: "Italiano",
    },
    {
      value: "ko",
      label: "Korean",
      description: "한국어",
    },
    {
      value: "tr",
      label: "Turkish",
      description: "Türkçe",
    },
    {
      value: "nl",
      label: "Dutch",
      description: "Nederlands",
    },
    {
      value: "sv",
      label: "Swedish",
      description: "Svenska",
    },
  ];
  return (
    <Combobox
      label={label}
      value={language}
      onValueChange={setLanguage}
      text={options.find((lang) => lang.value === language)!.description}
      tickSide="left"
      icon={showIcon ? icon : undefined}
      emptyMessage="No language found"
      placeholder="Select Language"
      size={size}
      className={className}
    >
      {options.map((lang) => (
        <ComboboxItem key={lang.value} value={lang.value}>
          <span className="w-full">
            {lang.label}
            <span className="text-xs text-gray-500">
              &nbsp;({lang.description})
            </span>
          </span>
        </ComboboxItem>
      ))}
    </Combobox>
  );
};

export default SelectLanguage;
