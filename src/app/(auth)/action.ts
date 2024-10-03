"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import {
  SigninData,
  SigninSchema,
  SignupData,
  SignupSchema,
} from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(
  credentials: SignupData,
): Promise<{ error: string }> {
  try {
    const validatedData = SignupSchema.safeParse(credentials);

    if (!validatedData.success) {
      return { error: validatedData.error.message };
    }

    const { email, password, username } = validatedData.data;

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUserName = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUserName) {
      return { error: "username already taken" };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return { error: "email already exists" };
    }

    await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
        displayName: username,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong" };
  }
}
