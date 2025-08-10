import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/*To edit or delete a comment our id  will commentId which will
come from when a user click the edit/delete comment button from the post */

// GET a single comment by commentId
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        post: {
          select: { id: true, title: true, slug: true },
        },
      },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found, may have been deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    return NextResponse.json(
      { error: "Failed to fetch comment" },
      { status: 500 }
    );
  }
}

// UPDATE a comment by commentId
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const updatedComment = await prisma.comment.update({
      where: { id: params.id },
      data: { content },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// DELETE a comment by commentId
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.comment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
