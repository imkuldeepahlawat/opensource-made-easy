import { Issue } from "../types";

interface IssuesListProps {
  issues?: Issue[];
}

export default function IssuesList({ issues = [] }: IssuesListProps) {
  if (issues.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No issues found. Please search for a repository first.
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
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">
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
                #{issue.number} opened by {issue.user.login}
              </p>
            </div>
            <div className="flex gap-2">
              {issue.labels.map((label) => (
                <span
                  key={label.id}
                  className="px-2 py-1 text-xs rounded-full"
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
