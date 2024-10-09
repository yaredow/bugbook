"use client";

import Post from "@/components/posts/post";
import useGetPosts from "@/hooks/useGetPosts";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const { data, isFetching, error } = useGetPosts();

  if (isFetching) return <Loader2 className="mx-auto animate-spin" />;

  if (error)
    return (
      <p className="text-center text-destructive">
        An error occurred while load posts
      </p>
    );

  return <>{data?.map((post) => <Post key={post.id} post={post} />)}</>;
}
