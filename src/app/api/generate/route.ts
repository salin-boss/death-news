import { NextRequest, NextResponse } from "next/server";
import { fetchLatestArticles } from "@/lib/rss";
import { rewriteMultipleArticles, RewrittenArticle } from "@/lib/gemini";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const GENERATED_POSTS_PATH = join(process.cwd(), "src/data/generated-posts.json");

function ensureDataDir() {
  const dataDir = join(process.cwd(), "src/data");
  if (!existsSync(dataDir)) {
    const { mkdirSync } = require("fs");
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey, count = 5 } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is required" },
        { status: 400 }
      );
    }

    // Fetch RSS articles
    const rssArticles = await fetchLatestArticles(count);

    if (rssArticles.length === 0) {
      return NextResponse.json(
        { error: "No articles found in RSS feed" },
        { status: 404 }
      );
    }

    // Rewrite with Gemini
    const rewritten = await rewriteMultipleArticles(rssArticles, apiKey);

    // Load existing posts and merge (avoid duplicates by originalLink)
    const existing = loadGeneratedPosts();
    const existingLinks = new Set(existing.map((p) => p.originalLink));
    const newPosts = rewritten.filter((p) => !existingLinks.has(p.originalLink));

    const allPosts = [...newPosts, ...existing];
    saveGeneratedPosts(allPosts);

    return NextResponse.json({
      success: true,
      generated: newPosts.length,
      total: allPosts.length,
      articles: newPosts,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = loadGeneratedPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ posts: [] });
  }
}
