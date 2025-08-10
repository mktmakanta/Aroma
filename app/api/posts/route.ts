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
      include: {
        categories: true, // Include category info in response
        author: { select: { id: true, name: true, email: true } },
      },
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error: any) {
    console.error("GET /posts error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// ADD NEW POST (with category IDs)
export async function POST(req: Request) {
  try {
    const { title, content, categoryIds } = await req.json();

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
          connect: { id: "user-1-id" }, // Replace with actual logged-in user ID
        },
        categories: {
          connect: categoryIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        categories: true,
        author: { select: { id: true, name: true, email: true } },
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
