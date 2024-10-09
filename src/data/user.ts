import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { UserDataSelect } from "@/lib/types";
import { unstable_cache } from "next/cache";

export async function getWhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: UserDataSelect,
    take: 5,
  });

  if (!usersToFollow) return null;

  return usersToFollow;
}
