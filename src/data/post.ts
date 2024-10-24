import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { unstable_cache } from "next/cache";

export async function getPosts() {
  try {
    const { user } = await validateRequest();

    if (!user) return null;
    const posts = await prisma.post.findMany({
      include: getPostDataInclude(user.id),
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts) return null;

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);
