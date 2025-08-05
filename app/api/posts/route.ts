// app/api/posts/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error: any) {
    console.error("GET /posts error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, authorId } = await req.json();

    if (!title || !content || !authorId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const slug = `${generateSlug(title)}-${Date.now()}`;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author: {
          connect: { id: authorId },
        },
      },
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error: any) {
    console.error("POST /posts error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
