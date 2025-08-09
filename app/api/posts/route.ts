import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// GET ALL POSTS
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

// ADD NEW POST
export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
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
          connect: { id: "user-1-id" },
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

// UPDATE POST (PUT)
export async function PUT(req: Request) {
  try {
    const { slug, title, content } = await req.json();

    if (!slug || (!title && !content)) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { slug }, //Using slug to find the post
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(title && { slug: `${generateSlug(title)}-${Date.now()}` }),
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error: any) {
    console.error("PUT /posts error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
