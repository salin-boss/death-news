import { NextRequest, NextResponse } from "next/server";
import { fetchLatestArticles } from "@/lib/rss";
import { rewriteMultipleArticles, RewrittenArticle } from "@/lib/gemini";
import { kv } from "@vercel/kv";

const POSTS_KEY = "generated-posts";

async function loadGeneratedPosts(): Promise<RewrittenArticle[]> {
  const posts = await kv.get<RewrittenArticle[]>(POSTS_KEY);
  return posts || [];
}

async function saveGeneratedPosts(posts: RewrittenArticle[]) {
  await kv.set(POSTS_KEY, posts);
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
    const existing = await loadGeneratedPosts();
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
    await saveGeneratedPosts(allPosts);

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
