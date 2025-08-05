// app/api/posts/[id]/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, published } = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        content,
        published,
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error: any) {
    console.error("PUT /posts/:id error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify({ message: "Post deleted" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("DELETE /posts/:id error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
