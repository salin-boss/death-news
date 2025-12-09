import { getAllPosts } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";

export default async function Home() {
  const posts = await getAllPosts();

  return <PostGrid posts={posts} />;
}
