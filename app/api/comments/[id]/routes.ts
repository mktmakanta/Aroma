import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// UPDATE a comment
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(JSON.stringify({ error: "Content is required" }), {
        status: 400,
      });
    }

    const updated = await prisma.comment.update({
      where: { id: params.id },
      data: { content },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error: any) {
    console.error("PUT /comments/[id] error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE a comment
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.comment.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(deleted), { status: 200 });
  } catch (error: any) {
    console.error("DELETE /comments/[id] error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
