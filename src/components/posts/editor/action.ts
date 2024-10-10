"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PostDataIncludes } from "@/lib/types";
import { CreatePostSchema } from "@/lib/validation";

export async function submitPost(input: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const validatedFields = CreatePostSchema.safeParse({ content: input });

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.issues[0].message);
  }

  const { content } = validatedFields.data;

  const newPost = await prisma.post.create({
    data: {
      userId: user.id,
      content,
    },
    include: PostDataIncludes,
  });

  return newPost;
}
