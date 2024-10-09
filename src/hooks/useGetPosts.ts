import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetPosts() {
  const { data, isFetching, error } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: kyInstance.get("/api/posts/for-you").json<PostData[]>,
  });

  return { data, isFetching, error };
}
