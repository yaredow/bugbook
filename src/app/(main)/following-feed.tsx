"use client";

import InfinitScrollContainer from "@/components/infinite-scroll-container";
import Post from "@/components/posts/post";
import PostsLoadingSkeleton from "@/components/posts/posts-loading-skeleton";
import useGetPosts from "@/hooks/useGetPosts";
import { Loader2 } from "lucide-react";

export default function FollowingFeed() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useGetPosts(false);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isFetching) return <PostsLoadingSkeleton />;

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No pst found. You can follow some users to see their posts.
      </p>
    );
  }

  if (status === "error")
    return (
      <p className="text-center text-destructive">
        An error occurred while load posts
      </p>
    );

  return (
    <InfinitScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto my-10 animate-spin" />}
    </InfinitScrollContainer>
  );
}
