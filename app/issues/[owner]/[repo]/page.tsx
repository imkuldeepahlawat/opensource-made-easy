import IssuesList from "@/app/components/IssuesList";
import Pagination from "@/app/components/Pagination";
import { Issue } from "@/app/types";
import { headers } from "next/headers";
import { Suspense } from "react";

async function getIssues(
  owner: string,
  repo: string,
  page = 1,
): Promise<{
  issues: Issue[];
  totalPages: number;
  currentPage: number;
  totalIssues: number;
}> {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Fetch repo details to get total issue count
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  const repoData = await repoRes.json();

  const res = await fetch(
    `${protocol}://${host}/api/issues/${owner}/${repo}?page=${page}&per_page=30`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch issues");
  }

  const data = await res.json();
  return {
    ...data,
    totalIssues: repoData.open_issues_count,
  };
}

function LoadingIssues() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}

export default async function IssuesPage({
  params,
  searchParams,
}: {
  params: { owner: string; repo: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { issues, totalPages, currentPage, totalIssues } = await getIssues(
    params.owner,
    params.repo,
    page,
  );

  const startIssue = (currentPage - 1) * 30 + 1;
  const endIssue = Math.min(currentPage * 30, totalIssues);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {params.owner}/{params.repo}
                <span className="text-sm font-normal px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  {totalIssues.toLocaleString()} issues
                </span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Showing issues {startIssue}-{endIssue} of {totalIssues}
              </p>
            </div>
            <a
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              ← Back to search
            </a>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-8">
        <Suspense fallback={<LoadingIssues />}>
          <IssuesList issues={issues} />
        </Suspense>
      </main>
    </div>
  );
}
