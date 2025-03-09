import IssuesList from "@/app/components/IssuesList";
import Pagination from "@/app/components/Pagination";
import { Issue, LabelCategory } from "@/app/types";
import { Suspense } from "react";
import LabelFilter from "@/app/components/LabelFilter";
import { categorizeIssue } from "@/app/utils/categorizeIssue";
import Image from "next/image";

// Update the Issue type to include categories
interface ExtendedIssue extends Issue {
  categories: LabelCategory[];
}

interface RepoDetails {
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string;
  topics: string[];
  license: {
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
  owner: {
    avatar_url: string;
    type: string;
  };
  subscribers_count: number;
  has_issues: boolean;
  has_discussions: boolean;
}

async function getIssues(
  owner: string,
  repo: string,
  page = 1,
): Promise<{
  issues: ExtendedIssue[];
  totalPages: number;
  currentPage: number;
  totalIssues: number;
  repoDetails: RepoDetails;
}> {
  // Fetch repo details
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!repoRes.ok) {
    throw new Error("Failed to fetch repository details");
  }

  const repoData = await repoRes.json();

  // Fetch issues directly from GitHub API
  const issuesRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=30&state=open`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!issuesRes.ok) {
    throw new Error("Failed to fetch issues");
  }

  const issues = (await issuesRes.json()) as Issue[];

  // Add categories to each issue
  const issuesWithCategories = issues.map((issue) => ({
    ...issue,
    categories: categorizeIssue(issue),
  })) as ExtendedIssue[];

  // Get total pages from Link header
  const linkHeader = issuesRes.headers.get("link");
  let totalPages = 1;

  if (linkHeader) {
    const lastLink = linkHeader
      .split(",")
      .find((link) => link.includes('rel="last"'));
    if (lastLink) {
      const match = lastLink.match(/page=(\d+)/);
      if (match) {
        totalPages = parseInt(match[1]);
      }
    }
  }

  return {
    issues: issuesWithCategories,
    totalPages,
    currentPage: page,
    totalIssues: repoData.open_issues_count,
    repoDetails: {
      description: repoData.description,
      stargazers_count: repoData.stargazers_count,
      forks_count: repoData.forks_count,
      language: repoData.language,
      homepage: repoData.homepage,
      topics: repoData.topics,
      license: repoData.license,
      created_at: repoData.created_at,
      updated_at: repoData.updated_at,
      owner: {
        avatar_url: repoData.owner.avatar_url,
        type: repoData.owner.type,
      },
      subscribers_count: repoData.subscribers_count,
      has_issues: repoData.has_issues,
      has_discussions: repoData.has_discussions,
    },
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

// Update the component props type
interface IssuesPageProps {
  params: { owner: string; repo: string };
  searchParams: { page?: string; category?: LabelCategory };
}

export default async function IssuesPage({
  params,
  searchParams,
}: IssuesPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const category = (searchParams.category as LabelCategory) || "all";
  const data = await getIssues(params.owner, params.repo, page);

  let { issues, totalPages, currentPage, totalIssues } = data;
  const { repoDetails } = data;

  // Filter issues by category if not 'all'
  if (category !== "all") {
    issues = issues.filter((issue) => issue.categories?.includes(category));
    totalIssues = issues.length;
    totalPages = Math.ceil(totalIssues / 30);
    currentPage = Math.min(currentPage, totalPages);
  }

  const startIssue = issues.length > 0 ? (currentPage - 1) * 30 + 1 : 0;
  const endIssue = Math.min(startIssue + issues.length - 1, totalIssues);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <Image
                src={repoDetails.owner.avatar_url}
                alt={`${params.owner} avatar`}
                width={48}
                height={48}
                className="rounded-full"
                unoptimized
              />
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {params.owner}/{params.repo}
                  {repoDetails.homepage && (
                    <a
                      href={repoDetails.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      🔗 Website
                    </a>
                  )}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {repoDetails.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {repoDetails.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {repoDetails.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {repoDetails.language}
                    </span>
                  )}
                  <span title="Stars">
                    ⭐ {repoDetails.stargazers_count.toLocaleString()}
                  </span>
                  <span title="Forks">
                    🍴 {repoDetails.forks_count.toLocaleString()}
                  </span>
                  <span title="Watchers">
                    👀 {repoDetails.subscribers_count.toLocaleString()}
                  </span>
                  {repoDetails.license && (
                    <span title="License">📜 {repoDetails.license.name}</span>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                    {totalIssues.toLocaleString()}{" "}
                    {category !== "all" ? `${category} ` : ""}issues
                  </span>
                  {issues.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Showing issues {startIssue}-{endIssue} of {totalIssues}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <a
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              ← Back to search
            </a>
          </div>
          <LabelFilter currentCategory={category} />
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
