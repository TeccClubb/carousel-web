import { useState, useMemo } from "react";

export const usePagination = <TData>({
  data,
  defaultPageSize = 10,
  minimumPageSize = 1,
  maximumPageSize = 100,
}: {
  data: TData[];
  defaultPageSize?: number;
  minimumPageSize?: number;
  maximumPageSize?: number;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(
    Math.min(Math.max(defaultPageSize, minimumPageSize), maximumPageSize)
  );

  // Calculate total pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Check if next/previous pages exist
  const hasNextPage = currentPage < totalPages - 1;
  const hasPrevPage = currentPage > 0;

  // Get paginated data for the current page
  const currentPageData = useMemo(() => {
    const start = currentPage * pageSize;
    return data.slice(start, start + pageSize);
  }, [currentPage, pageSize, data]);

  // Functions for pagination
  const goToFirstPage = () => setCurrentPage(0);
  const goToLastPage = () => setCurrentPage(totalPages - 1);
  const goToNextPage = () => hasNextPage && setCurrentPage((prev) => prev + 1);
  const goToPrevPage = () => hasPrevPage && setCurrentPage((prev) => prev - 1);

  // Go to a specific page (ensuring it's within range)
  const goToPage = (page: number) => {
    const validPage = Math.max(0, Math.min(page, totalPages - 1)); // Ensure valid range
    goToPage(validPage);
  };

  // Update page size within min & max range
  const updatePageSize = (size: number) => {
    setPageSize(Math.min(Math.max(size, minimumPageSize), maximumPageSize)); // Ensure within range
    setCurrentPage(0); // Reset to first page when changing page size
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    currentPageData,
    hasNextPage,
    hasPrevPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setPageSize: updatePageSize,
  } as const;
};
