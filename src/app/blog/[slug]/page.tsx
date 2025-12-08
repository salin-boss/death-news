import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | DEATH.NEWS`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[var(--text-light)] hover:text-[var(--bone)] transition-colors mb-8"
      >
        <span>&larr;</span>
        <span>Back to all articles</span>
      </Link>

      <header className="mb-8">
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[var(--crimson)] mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl font-bold text-[var(--bone)] leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--text-light)]">
          <span className="text-[var(--bone)]">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </header>

      <div className="aspect-[16/9] relative mb-8 overflow-hidden bg-[var(--ash)]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-xl text-[var(--bone)] leading-relaxed mb-6">
          {post.excerpt}
        </p>
        <div className="text-[var(--foreground)] leading-relaxed space-y-4">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-[var(--ash)]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--crimson)] hover:text-[var(--bone)] transition-colors"
        >
          <span>&larr;</span>
          <span>Back to all articles</span>
        </Link>
      </footer>
    </article>
  );
}
