import { getWhoToFollow } from "@/data/user";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "./user-avater";
import { formatNumber } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import FollowButton from "./follow-button";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit flex-none space-y-5 sm:w-72 md:block lg:w-80">
      <Suspense fallback={<Loader className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

export async function WhoToFollow() {
  const usersToFollow = await getWhoToFollow();

  if (!usersToFollow) return;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-2xl font-bold">
        <div className="text-xl font-bold">Who to follow</div>
        {usersToFollow.map((user, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
            </Link>
            <div>
              <p className="line-clamp-1 break-all text-xl font-semibold">
                {user.displayName}
              </p>
              <p className="line-clamp-1 break-all text-xl text-muted-foreground">
                @{user.username}
              </p>
            </div>
            <FollowButton
              userId={user.id}
              initialState={{
                isFollowedByUser: user.followers.some(
                  ({ followerId }) => followerId === user.id,
                ),
                followers: user._count.followers,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const getTrendingTopics = unstable_cache(
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

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
