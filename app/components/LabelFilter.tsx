"use client";

import { LabelCategory, labelCategories } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function LabelFilter({
  currentCategory,
}: {
  currentCategory: LabelCategory;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: LabelCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("page"); // Reset to first page when changing category
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {(Object.keys(labelCategories) as LabelCategory[]).map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-3 py-1 rounded-full text-sm ${
            currentCategory === category
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {category.charAt(0).toUpperCase() +
            category.slice(1).replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
