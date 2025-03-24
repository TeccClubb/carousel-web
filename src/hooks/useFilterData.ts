import { useState, useMemo } from "react";

export const useFilterData = <TData>({
  data,
  filterFields,
}: {
  data: TData[];
  filterFields: (keyof TData)[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((item) =>
      filterFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, filterFields]);

  // Function to highlight matching text
  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi"); // Case-insensitive search
    return text.replace(
      regex,
      (match) =>
        `<span style="background-color: yellow; font-weight: bold;">${match}</span>`
    );
  };

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    highlightText,
  } as const;
};
