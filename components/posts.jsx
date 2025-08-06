import prisma from "@/lib/prisma";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} by {post.author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
