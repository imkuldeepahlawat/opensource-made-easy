"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jumpToPage, setJumpToPage] = useState("");

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setJumpToPage("");
    }
  };

  // Generate array of page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    let l;
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-50"
        >
          Previous
        </button>

        {getVisiblePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-gray-200 dark:border-gray-800"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2">
              {page}
            </span>
          ),
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
          placeholder="Go to page"
          className="w-20 px-2 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        />
        <button
          type="submit"
          className="px-3 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Go
        </button>
      </form>
    </div>
  );
}
