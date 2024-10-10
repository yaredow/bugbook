"use client";

import InfinitScrollContainer from "@/components/infinite-scroll-container";
import Post from "@/components/posts/post";
import useGetPosts from "@/hooks/useGetPosts";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useGetPosts();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isFetching) return <Loader2 className="mx-auto animate-spin" />;

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
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
