import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Metadata } from "next";
import { cache } from "react";

type UserProfilePageProps = {
  params: {
    username: string;
  };
};

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  return user;
});

export async function generateMetadata({
  params: { username },
}: UserProfilePageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user?.displayName} (@${user?.username})`,
  };
}

export default async function UserProfilePage({
  params: { username },
}: UserProfilePageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        Y&apos;re not authorized to view this page
      </p>
    );
  }

  const user = await getUser(username, loggedInUser.id);
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5"></div>
    </main>
  );
}
