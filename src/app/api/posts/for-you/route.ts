import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PostDataIncludes } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await validateRequest();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      include: PostDataIncludes,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts) {
      NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
