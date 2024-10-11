import kyInstance from "@/lib/ky";
import { FollowerInfor } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetFollowerInfor(
  userId: string,
  initialState: FollowerInfor,
) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      kyInstance.get(`/api/users/${userId}/followers`).json<FollowerInfor>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
}
