import { Prisma } from "@prisma/client";

export const UserDataSelect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export const PostDataIncludes = {
  user: {
    select: UserDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof PostDataIncludes;
}>;

export type PostPage = {
  posts: PostData[];
  nextCursor: string | null;
};
