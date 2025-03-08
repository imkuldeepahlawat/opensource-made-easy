import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { owner: string; repo: string } },
) {
  const { owner, repo } = params;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch issues");
    }

    const issues = await response.json();
    return NextResponse.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 },
    );
  }
}
