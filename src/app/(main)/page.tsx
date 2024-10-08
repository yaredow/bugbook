import PostEditor from "@/components/posts/editor/post-editor";
import Post from "@/components/posts/post";
import TrendsSidebar from "@/components/trends-sidebar";
import { getPosts } from "@/data/post";

export default async function Home() {
  const posts = await getPosts();

  if (!posts) return null;

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
}
