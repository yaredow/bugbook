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
    <main className="h-[200vh] w-full bg-red-50">
      <div className="w-full">
        <PostEditor />
      </div>
      <div>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </main>
  );
}
