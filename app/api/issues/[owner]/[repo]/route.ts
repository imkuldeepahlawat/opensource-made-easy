import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { owner: string; repo: string } },
) {
  const { owner, repo } = params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const per_page = "30";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=${per_page}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch issues");
    }

    // Get total pages from Link header
    const linkHeader = response.headers.get("link");
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

    const issues = await response.json();
    return NextResponse.json({
      issues,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 },
    );
  }
}
