import IssuesList from "@/app/components/IssuesList";
import { Issue } from "@/app/types";

import { headers } from "next/headers";

async function getIssues(owner: string, repo: string): Promise<Issue[]> {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/issues/${owner}/${repo}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch issues");
  }

  return res.json();
}

export default async function IssuesPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const issues = await getIssues(params.owner, params.repo);

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {params.owner}/{params.repo}
          </h1>
          <a
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            ← Back to search
          </a>
        </div>

        <IssuesList issues={issues} />
      </main>
    </div>
  );
}
