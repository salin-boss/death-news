import { RSSArticle } from "./rss";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface RewrittenArticle {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  originalLink: string;
}

const SYSTEM_PROMPT = `You are a writer for DEATH.NEWS, a satirical news site with a dark, fear-mongering tone. Your job is to take real news headlines and excerpts and rewrite them in a dramatic, apocalyptic style.

Rules:
- Make the headline more dramatic and ominous
- Expand the excerpt into 2-3 short paragraphs of fear-mongering content
- Keep it satirical and over-the-top, not actually harmful
- Assign a category from: World, Tech, Finance, Science, Markets
- Do NOT fabricate specific statistics or quotes
- The tone should be darkly humorous, like The Onion meets doomsday prepping

Respond in JSON format:
{
  "title": "dramatic headline",
  "excerpt": "one sentence hook",
  "content": "2-3 paragraphs of content",
  "category": "category"
}`;

export async function rewriteArticle(
  article: RSSArticle,
  apiKey: string
): Promise<RewrittenArticle> {
  const prompt = `Rewrite this news article in DEATH.NEWS style:

Original Title: ${article.title}
Original Excerpt: ${article.excerpt}

Remember to respond in JSON format only.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: SYSTEM_PROMPT },
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response from Gemini");
  }

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse Gemini response as JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    category: parsed.category,
    originalLink: article.link,
  };
}

export async function rewriteMultipleArticles(
  articles: RSSArticle[],
  apiKey: string
): Promise<RewrittenArticle[]> {
  const results: RewrittenArticle[] = [];

  for (const article of articles) {
    try {
      const rewritten = await rewriteArticle(article, apiKey);
      results.push(rewritten);
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to rewrite article: ${article.title}`, error);
    }
  }

  return results;
}
