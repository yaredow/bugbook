import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("/api/posts/for-you");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();

  return data;
};

export default function useGetPosts() {
  const { data, isFetching, error } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: fetchPosts,
  });

  return { data, isFetching, error };
}
