import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// GET A SINGLE POST
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    console.error("GET /posts/[id] error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// UPDATE A POST
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await req.json();

    if (!title && !content) {
      return new Response(JSON.stringify({ error: "Nothing to update" }), {
        status: 400,
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(title && { slug: `${generateSlug(title)}-${Date.now()}` }),
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error: any) {
    console.error("PUT /posts/[id] error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
// DELETE A POST
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
    console.error("DELETE /posts/[id] error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
