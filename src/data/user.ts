import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { UserDataSelect } from "@/lib/types";
import { unstable_cache } from "next/cache";

export async function getWhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: UserDataSelect,
    take: 5,
  });

  if (!usersToFollow) return null;

  return usersToFollow;
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
