import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
}

export default function PostCard({
  slug,
  title,
  date,
  category,
  author,
  excerpt,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="py-8 border-b border-[var(--ash)]">
        <span className="inline-block text-xs font-medium px-2 py-1 bg-[var(--diarrhea)] text-[var(--black)] rounded mb-3">
          {category}
        </span>
        <h2 className="text-xl font-bold text-[var(--bone)] group-hover:text-[var(--crimson)] transition-colors leading-snug mb-3">
          {title}
        </h2>
        <p className="text-[var(--text-light)] leading-relaxed mb-4">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-sm text-[var(--text-light)]">
          <span className="text-[var(--bone)]">{author}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </article>
    </Link>
  );
}
