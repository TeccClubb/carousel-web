import React, { FC } from "react";
import { Combobox } from "../ui";
import { ComboboxOption } from "../ui/combobox";
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
  const options: ComboboxOption[] = [
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
      options={options}
      value={language}
      label={label}
      onSelect={setLanguage}
      tickSide="left"
      icon={showIcon ? icon : undefined}
      emptyMessage="No language found"
      placeholder="Select Language"
      showDescription
      size={size}
      className={className}
    />
  );
};

export default SelectLanguage;
