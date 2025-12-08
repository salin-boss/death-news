import { getAllPosts } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";

export default function Home() {
  const posts = getAllPosts();

  return <PostGrid posts={posts} />;
}
