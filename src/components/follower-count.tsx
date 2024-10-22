"use client";

import useGetFollowerInfor from "@/hooks/useGetFollowerInfor";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

type FollowerCountProps = {
  userId: string;
  initialState: FollowerInfo;
};

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useGetFollowerInfor(userId, initialState);
  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data?.followers)}</span>
    </span>
  );
}
