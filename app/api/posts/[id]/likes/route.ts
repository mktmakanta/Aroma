import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL LIKES OF A POST
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const likes = await prisma.postLike.findMany({
      where: { postId: params.id },
      include: {
        user: {
          select: { id: true, name: true, email: true }, // limit to needed fields
        },
      },
    });

    return NextResponse.json(likes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    );
  }
}

// LIKE A POST
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if already liked
    const existingLike = await prisma.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.id,
        },
      },
    });

    if (existingLike) {
      // Unlike (delete record)
      await prisma.postLike.delete({
        where: {
          userId_postId: {
            userId,
            postId: params.id,
          },
        },
      });

      return NextResponse.json(
        { message: "Post unliked successfully" },
        { status: 200 }
      );
    }

    // Like (create record)
    const like = await prisma.postLike.create({
      data: {
        userId,
        postId: params.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error: any) {
    console.error("POST /posts/:id/likes error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
