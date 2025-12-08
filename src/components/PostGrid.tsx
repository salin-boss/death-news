"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Post } from "@/lib/posts";

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const [hero, ...rest] = posts;
  const [flickeringIndices, setFlickeringIndices] = useState<number[]>([0, 3, 7]);

  useEffect(() => {
    const interval = setInterval(() => {
      const allIndices = [-1, ...rest.map((_, i) => i)];
      const shuffled = allIndices.sort(() => Math.random() - 0.5);
      setFlickeringIndices(shuffled.slice(0, 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [rest.length]);

  if (!hero) {
    return <div className="text-[var(--text-light)]">No posts available</div>;
  }

  return (
    <div>
      {/* Hero Article */}
      <Link href={`/blog/${hero.slug}`} className="block group mb-12">
        <article>
          <div className="aspect-[16/9] relative mb-6 overflow-hidden bg-[var(--ash)]">
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover"
            />
          </div>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white mb-3 relative">
            <span className={`${flickeringIndices.includes(-1) ? 'flare-h' : 'opacity-100'} absolute top-1/2 -translate-y-1/2 -inset-x-6 h-[4px] bg-gradient-to-r from-transparent via-[#ff0000] to-transparent blur-[3px]`}></span>
            <span className={`${flickeringIndices.includes(-1) ? 'flare-v' : 'opacity-90'} absolute left-1/2 -translate-x-1/2 -inset-y-4 w-[4px] bg-gradient-to-b from-transparent via-[#ff0000] to-transparent blur-[3px]`}></span>
            <span className="relative">{hero.category}</span>
          </span>
          <h1 className="text-3xl font-bold text-[var(--bone)] group-hover:text-[var(--crimson)] transition-colors leading-tight mb-4">
            {hero.title}
          </h1>
          <p className="text-[var(--text-light)] leading-relaxed text-lg mb-4">
            {hero.excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-light)]">
            <span className="text-[var(--bone)]">{hero.author}</span>
            <span>·</span>
            <span>{hero.date}</span>
          </div>
        </article>
      </Link>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rest.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article>
              <div className="aspect-[4/3] relative mb-4 overflow-hidden bg-[var(--ash)]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white mb-2 relative">
                <span className={`${flickeringIndices.includes(index) ? 'flare-h' : 'opacity-100'} absolute top-1/2 -translate-y-1/2 -inset-x-6 h-[4px] bg-gradient-to-r from-transparent via-[#ff0000] to-transparent blur-[3px]`}></span>
                <span className={`${flickeringIndices.includes(index) ? 'flare-v' : 'opacity-90'} absolute left-1/2 -translate-x-1/2 -inset-y-4 w-[4px] bg-gradient-to-b from-transparent via-[#ff0000] to-transparent blur-[3px]`}></span>
                <span className="relative">{post.category}</span>
              </span>
              <h2 className="text-base font-bold text-[var(--bone)] group-hover:text-[var(--crimson)] transition-colors leading-snug mb-2">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
                <span className="text-[var(--bone)]">{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border border-[var(--ash)] text-[var(--text-light)] hover:border-[var(--crimson)] hover:text-[var(--crimson)] transition-colors text-sm font-medium">
          Load more posts
        </button>
      </div>
    </div>
  );
}
