"use server";

import { lucia, validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  SigninData,
  SigninSchema,
  SignupData,
  SignupSchema,
} from "@/lib/validation";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

function setLuciaSessionCookie(sessionId: string) {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function signup(
  credentials: SignupData,
): Promise<{ error: string }> {
  try {
    const validatedData = SignupSchema.safeParse(credentials);

    if (!validatedData.success) {
      return { error: validatedData.error.message };
    }

    const { email, password, username } = validatedData.data;

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = generateIdFromEntropySize(10);

    const existingUserName = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (existingUserName) return { error: "Username already taken" };

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (existingEmail) return { error: "Email already exists" };

    await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
        displayName: username,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    setLuciaSessionCookie(session.id);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function signin(
  credentials: SigninData,
): Promise<{ error: string }> {
  try {
    const validatedData = SigninSchema.safeParse(credentials);

    if (!validatedData.success) {
      return { error: validatedData.error.message };
    }

    const { password, username } = validatedData.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.password) {
      return { error: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) return { error: "Invalid credentials" };

    const session = await lucia.createSession(existingUser.id, {});
    setLuciaSessionCookie(session.id);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
}

export async function signout() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/signin");
}
