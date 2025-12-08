import Parser from "rss-parser";

export interface RSSArticle {
  title: string;
  link: string;
  excerpt: string;
  pubDate: string;
  guid: string;
}

const parser = new Parser();

const RSS_FEED_URL = "https://feeds.a.dj.com/rss/RSSMarketsMain.xml";

export async function fetchRSSFeed(): Promise<RSSArticle[]> {
  const feed = await parser.parseURL(RSS_FEED_URL);

  return feed.items.map((item) => ({
    title: item.title || "Untitled",
    link: item.link || "",
    excerpt: item.contentSnippet || item.content || "",
    pubDate: item.pubDate || new Date().toISOString(),
    guid: item.guid || item.link || "",
  }));
}

export async function fetchLatestArticles(limit: number = 10): Promise<RSSArticle[]> {
  const articles = await fetchRSSFeed();
  return articles.slice(0, limit);
}
