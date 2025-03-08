import { Issue } from "../types";
import { formatDistanceToNow } from "date-fns";

interface IssuesListProps {
  issues?: Issue[];
}

export default function IssuesList({ issues = [] }: IssuesListProps) {
  if (issues.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <p className="text-lg font-medium">No issues found</p>
        <p className="mt-2">
          This repository doesn&#39;t have any open issues.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-medium text-lg truncate">
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {issue.title}
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                #{issue.number} opened{" "}
                {formatDistanceToNow(new Date(issue.created_at))} ago by{" "}
                <a
                  href={`https://github.com/${issue.user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {issue.user.login}
                </a>
              </p>
              {issue.body && (
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {issue.body}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-start">
              {issue.labels.map((label) => (
                <span
                  key={label.id}
                  className="px-2 py-1 text-xs rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: `#${label.color}`,
                    color:
                      parseInt(label.color, 16) > 0x7fffff ? "#000" : "#fff",
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
