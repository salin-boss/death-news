import { NextRequest, NextResponse } from "next/server";
import { fetchLatestArticles } from "@/lib/rss";
import { rewriteMultipleArticles, RewrittenArticle } from "@/lib/gemini";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const GENERATED_POSTS_PATH = join(process.cwd(), "src/data/generated-posts.json");

function ensureDataDir() {
  const dataDir = join(process.cwd(), "src/data");
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

function loadGeneratedPosts(): RewrittenArticle[] {
  if (!existsSync(GENERATED_POSTS_PATH)) {
    return [];
  }
  const data = readFileSync(GENERATED_POSTS_PATH, "utf-8");
  return JSON.parse(data);
}

function saveGeneratedPosts(posts: RewrittenArticle[]) {
  ensureDataDir();
  writeFileSync(GENERATED_POSTS_PATH, JSON.stringify(posts, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional but recommended)
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable not set" },
        { status: 500 }
      );
    }

    // Fetch RSS articles
    const rssArticles = await fetchLatestArticles(5);

    if (rssArticles.length === 0) {
      return NextResponse.json({ message: "No articles in RSS feed" });
    }

    // Load existing posts to check for duplicates
    const existing = loadGeneratedPosts();
    const existingLinks = new Set(existing.map((p) => p.originalLink));

    // Filter out articles we've already processed
    const newArticles = rssArticles.filter((a) => !existingLinks.has(a.link));

    if (newArticles.length === 0) {
      return NextResponse.json({
        message: "No new articles to process",
        existing: existing.length
      });
    }

    // Rewrite new articles with Gemini
    const rewritten = await rewriteMultipleArticles(newArticles, apiKey);

    // Merge and save (new articles first)
    const allPosts = [...rewritten, ...existing].slice(0, 50); // Keep max 50 posts
    saveGeneratedPosts(allPosts);

    return NextResponse.json({
      success: true,
      generated: rewritten.length,
      total: allPosts.length,
    });
  } catch (error) {
    console.error("Cron generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
