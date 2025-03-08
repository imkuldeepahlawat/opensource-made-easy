"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract owner and repo from URL
    const matches = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (matches) {
      const [, owner, repo] = matches;
      router.push(`/issues/${owner}/${repo}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-4">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Paste GitHub repository URL"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
