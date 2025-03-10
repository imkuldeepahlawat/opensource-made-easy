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
    "gsoc",
    "google-summer-of-code",
    "outreachy",
    "season-of-docs",
    "mlh-fellowship",
    "kde",
    "fossasia",
    "codeheat",
    "linux-kernel",
    "hyperledger",
    "girlscript",
    "hacktoberfest-accepted",
    "hacktoberfest-beginner",
    "hacktoberfest-easy",
    "hacktoberfest-good-first-issue",
    "hacktoberfest-help-wanted",
    "hacktoberfest-good-first-issue",
  ];

  // Randomize the search queries array using Fisher-Yates shuffle
  const shuffledQueries = [...searchQueries];
  for (let i = shuffledQueries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQueries[i], shuffledQueries[j]] = [
      shuffledQueries[j],
      shuffledQueries[i],
    ];
  }

  try {
    const responses = await Promise.all(
      // Use the shuffled array instead of the original
      shuffledQueries.map((query) =>
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
