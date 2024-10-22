"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import Post from "@/components/posts/post";
import PostsLoadingSkeleton from "@/components/posts/posts-loading-skeleton";
import useGetUserPosts from "@/hooks/useGetUserPosts";
import { Loader2 } from "lucide-react";

type UserPostsProps = {
  userId: string;
};

export default function UserPosts({ userId }: UserPostsProps) {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useGetUserPosts(userId);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isFetching) return <PostsLoadingSkeleton />;

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        User has posted anything yet.
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
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto my-10 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
