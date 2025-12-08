# DEATH.NEWS

A satirical news site that automatically scrapes WSJ's RSS feed and rewrites articles in a fear-mongering tone using Google Gemini AI.

## How It Works

```
Every 5 minutes:
GitHub Actions → triggers → Vercel API → fetches WSJ RSS → Gemini rewrites → publishes to site
```

## Architecture

| Component | Purpose |
|-----------|---------|
| `src/lib/rss.ts` | Fetches WSJ Markets RSS feed |
| `src/lib/gemini.ts` | Rewrites articles via Gemini API |
| `src/app/api/cron/generate/route.ts` | API endpoint that runs the pipeline |
| `.github/workflows/generate-articles.yml` | Cron job (every 5 min) |
| `src/data/generated-posts.json` | Stored rewritten articles |

## Environment Variables

**Vercel:**
- `GEMINI_API_KEY` - Google Gemini API key
- `CRON_SECRET` - Auth token for cron endpoint

**GitHub Secrets:**
- `SITE_URL` - Vercel deployment URL
- `CRON_SECRET` - Must match Vercel's value

## Manual Trigger

```bash
# Generate articles manually (local dev)
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "YOUR_GEMINI_KEY", "count": 5}'
```

## Local Development

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## Deployment

Hosted on Vercel. Push to `main` to deploy.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Google Gemini API
- GitHub Actions (cron)
