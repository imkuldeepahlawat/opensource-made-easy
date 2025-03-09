import { NextResponse } from "next/server";

export async function GET() {
  const searchQueries = [
    "open-source",
    "hacktoberfest",
    "beginner-friendly",
    "good-first-issue",
    "help-wanted",
    "javascript",
    "python",
    "react",
    "node",
    "web-development",
    "machine-learning",
    "first-timers-only",
    "documentation",
    "bug",
    "enhancement",
  ];

  try {
    const responses = await Promise.all(
      searchQueries.map((query) =>
        fetch(`https://api.github.com/search/topics?q=${query}`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
      ),
    );

    const data = await Promise.all(responses.map((r) => r.json()));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 },
    );
  }
}
