// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      id: "user-1-id", // Replace with your actual Supabase auth user ID
      email: "user1@example.com",
      name: "Alice",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "user-2-id",
      email: "user2@example.com",
      name: "Bob",
    },
  });

  // Categories
  const catTech = await prisma.category.create({ data: { name: "Tech" } });
  const catLife = await prisma.category.create({ data: { name: "Lifestyle" } });
  const catNews = await prisma.category.create({ data: { name: "News" } });

  // Tags
  const tagReact = await prisma.tag.create({ data: { name: "React" } });
  const tagNext = await prisma.tag.create({ data: { name: "Next.js" } });
  const tagPrisma = await prisma.tag.create({ data: { name: "Prisma" } });

  // Posts
  const post1 = await prisma.post.create({
    data: {
      title: "Getting started with React",
      slug: "getting-started-with-react",
      content: "React is a popular JavaScript library...",
      published: true,
      authorId: user1.id,
      categories: { connect: [{ id: catTech.id }] },
      tags: { connect: [{ id: tagReact.id }, { id: tagNext.id }] },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Life as a developer",
      slug: "life-as-a-developer",
      content: "Balancing life and code...",
      published: true,
      authorId: user2.id,
      categories: { connect: [{ id: catLife.id }] },
      tags: { connect: [{ id: tagPrisma.id }] },
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "Latest tech news 2025",
      slug: "latest-tech-news-2025",
      content: "Here’s what’s new in tech...",
      published: true,
      authorId: user1.id,
      categories: { connect: [{ id: catNews.id }] },
      tags: { connect: [{ id: tagReact.id }] },
    },
  });

  // Comments
  await prisma.comment.createMany({
    data: [
      { content: "Great post!", postId: post1.id, authorId: user2.id },
      { content: "Thanks for sharing.", postId: post2.id, authorId: user1.id },
    ],
  });

  // Likes
  await prisma.postLike.createMany({
    data: [
      { postId: post1.id, userId: user2.id },
      { postId: post2.id, userId: user1.id },
    ],
  });
}

main()
  .then(() => {
    console.log("🌱 Seed completed");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
