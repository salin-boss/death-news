export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  originalLink?: string;
}

// Stock images by category for generated posts
const categoryImages: Record<string, string[]> = {
  World: [
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  Tech: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  ],
  Finance: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  ],
  Markets: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
  ],
  Science: [
    "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80",
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
  ],
};

const authors = ["Elena Voss", "Marcus Webb", "Yuki Tanaka", "Alex Chen", "Jordan Lee"];

function getImageForCategory(category: string): string {
  const images = categoryImages[category] || categoryImages.World;
  return images[Math.floor(Math.random() * images.length)];
}

function getRandomAuthor(): string {
  return authors[Math.floor(Math.random() * authors.length)];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export const posts: Post[] = [
  {
    slug: "world-leaders-summit-collapse",
    title: "World Leaders Flee as Climate Summit Collapses Into Chaos",
    date: "Dec 8, 2024",
    category: "World",
    author: "Elena Voss",
    excerpt:
      "Delegates walked out en masse after proposed emissions targets were deemed 'apocalyptically insufficient' by scientific advisors.",
    content: `# World Leaders Flee as Climate Summit Collapses Into Chaos\n\nThe annual global climate summit descended into pandemonium today.`,
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
  },
  {
    slug: "tech-giant-ai-warning",
    title: "Tech CEO: 'We've Created Something We Don't Understand'",
    date: "Dec 7, 2024",
    category: "Tech",
    author: "Marcus Webb",
    excerpt:
      "In a rare moment of candor, the founder admitted the industry has 'lost control of the narrative.'",
    content: `# Tech Giant CEO Issues Dire Warning\n\n"We've created something we don't understand."`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    slug: "economic-forecast-grim",
    title: "Markets Shudder as Economists Predict 'Unprecedented Volatility'",
    date: "Dec 6, 2024",
    category: "Finance",
    author: "Rachel Tan",
    excerpt:
      "Major indices swung wildly as institutional investors fled to cash positions.",
    content: `# Economists Predict 'Unprecedented Volatility'\n\nMarkets closed in turmoil today.`,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    slug: "mysterious-signal-detected",
    title: "Deep Space Array Detects Unexplained Signal Pattern",
    date: "Dec 5, 2024",
    category: "Science",
    author: "Yuki Tanaka",
    excerpt:
      "Astronomers remain baffled by recurring transmissions from a region of space previously thought empty.",
    content: `# Deep Space Array Detects Unexplained Signal\n\nThe signal repeats every 17.4 minutes.`,
    image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80",
  },
  {
    slug: "social-media-exodus",
    title: "Mass Exodus from Social Platforms as Users Demand 'Digital Sovereignty'",
    date: "Dec 4, 2024",
    category: "Tech",
    author: "Jordan Lee",
    excerpt:
      "Millions have deleted accounts this month, citing algorithmic manipulation and privacy concerns.",
    content: `# Mass Exodus from Social Platforms\n\nThe movement began quietly but has reached critical mass.`,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    slug: "underground-bunker-trend",
    title: "Billionaires Buying Bunkers at Record Rates, Contractors Reveal",
    date: "Dec 3, 2024",
    category: "World",
    author: "Alex Chen",
    excerpt:
      "Luxury underground shelters are selling faster than penthouses. 'They know something,' says one builder.",
    content: `# Billionaires Buying Bunkers\n\nThe ultra-wealthy are preparing for something.`,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    slug: "antibiotic-resistance-crisis",
    title: "WHO Declares Antibiotic Resistance 'Global Health Emergency'",
    date: "Dec 2, 2024",
    category: "Science",
    author: "Dr. Priya Sharma",
    excerpt:
      "Common infections becoming untreatable as superbugs spread faster than new drugs can be developed.",
    content: `# WHO Declares Antibiotic Resistance Emergency\n\nWe are entering a post-antibiotic era.`,
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
  },
  {
    slug: "crypto-whale-vanishes",
    title: "Crypto Whale Vanishes with $2.3B, Leaving Only Cryptic Message",
    date: "Dec 1, 2024",
    category: "Finance",
    author: "Marcus Webb",
    excerpt:
      "The anonymous trader's final transaction included a hidden message: 'The house always wins.'",
    content: `# Crypto Whale Vanishes\n\nBlockchain analysts are scrambling to trace the funds.`,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
  {
    slug: "deepfake-election-chaos",
    title: "Deepfake Video Causes Election Chaos in Three Countries Simultaneously",
    date: "Nov 30, 2024",
    category: "World",
    author: "Elena Voss",
    excerpt:
      "Coordinated disinformation attack marks new era of AI-powered political warfare.",
    content: `# Deepfake Election Chaos\n\nThe videos were indistinguishable from reality.`,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    slug: "ocean-dead-zone-expands",
    title: "Pacific Dead Zone Now Visible from Space, Scientists Warn",
    date: "Nov 29, 2024",
    category: "Science",
    author: "Yuki Tanaka",
    excerpt:
      "Oxygen-depleted region has grown 40% in one year. Marine life fleeing in 'unprecedented migration.'",
    content: `# Ocean Dead Zone Expands\n\nThe Pacific is dying faster than models predicted.`,
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&q=80",
  },
];

// For server-side: load generated posts from Vercel KV
async function loadGeneratedPosts(): Promise<Post[]> {
  if (typeof window !== "undefined") {
    return []; // Client-side: can't access KV
  }

  try {
    const { kv } = await import("@vercel/kv");
    const data = await kv.get<Array<{ title: string; excerpt: string; content: string; category: string; originalLink: string }>>("generated-posts");

    if (!data) {
      return [];
    }

    return data.map((article) => ({
      slug: slugify(article.title),
      title: article.title,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: article.category,
      author: getRandomAuthor(),
      excerpt: article.excerpt,
      content: article.content,
      image: getImageForCategory(article.category),
      originalLink: article.originalLink,
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const allPosts = await getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

export async function getAllPosts(): Promise<Post[]> {
  const generated = await loadGeneratedPosts();
  return [...generated, ...posts];
}

export function getStaticPosts(): Post[] {
  return posts;
}
