import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

// GET handler returns the current db.json
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/db.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read database file" }, { status: 500 });
  }
}

// POST handler commits changes to GitHub or writes locally
export async function POST(request: Request) {
  try {
    const newDb = await request.json();
    const headerToken = request.headers.get("x-github-token");
    const token = headerToken || process.env.GITHUB_TOKEN;
    const isDev = process.env.NODE_ENV === "development";

    // Validate request structure (basic check)
    if (!newDb.homepageData || !newDb.projects) {
      return NextResponse.json({ error: "Invalid database structure" }, { status: 400 });
    }

    // Local fallback for development if token is not configured
    if (isDev && !token) {
      const filePath = path.join(process.cwd(), "src/data/db.json");
      fs.writeFileSync(filePath, JSON.stringify(newDb, null, 2), "utf-8");
      return NextResponse.json({ message: "Saved locally in development mode" });
    }

    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN environment variable is not configured on Vercel" },
        { status: 500 }
      );
    }

    const repoOwner = "obende-m";
    const repoName = "Rivendell";
    const filePath = "src/data/db.json";
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    // 1. Fetch current file SHA from GitHub
    const getRes = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Rivendell-CMS",
      },
      cache: "no-store",
    });

    if (!getRes.ok) {
      const errText = await getRes.text();
      return NextResponse.json(
        { error: `Failed to fetch file details from GitHub: ${errText}` },
        { status: getRes.status }
      );
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Commit update back to GitHub
    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Rivendell-CMS",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "content: update website database via online /admin dashboard",
        content: Buffer.from(JSON.stringify(newDb, null, 2)).toString("base64"),
        sha: sha,
        branch: "main",
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return NextResponse.json(
        { error: `Failed to push commit to GitHub: ${errText}` },
        { status: putRes.status }
      );
    }

    return NextResponse.json({ message: "Content published successfully to GitHub!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}
