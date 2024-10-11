import useGetFollowerInfor from "@/hooks/useGetFollowerInfor";
import { FollowerInfor } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

type FollowButtonProps = {
  userId: string;
  initialState: FollowerInfor;
};

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const queryClient = useQueryClient();
  const { data } = useGetFollowerInfor(userId, initialState);

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={data.isFollowedByUser ? "secondary" : "default"}
    ></Button>
  );
}
