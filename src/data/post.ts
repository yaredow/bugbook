import prisma from "@/lib/prisma";
import { PostDataIncludes } from "@/lib/types";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: PostDataIncludes,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts) return null;

  return posts;
}
