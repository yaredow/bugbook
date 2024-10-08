import PostEditor from "@/components/posts/editor/post-editor";
import Post from "@/components/posts/post";
import prisma from "@/lib/prisma";
import { PostDataIncludes } from "@/lib/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: PostDataIncludes,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
