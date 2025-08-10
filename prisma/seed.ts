import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Step 1: Delete all existing categories
  await prisma.category.deleteMany();
  console.log("🗑️ Old categories deleted");

  // Step 2: Add the new ones
  const categories = [
    { name: "Tech News" },
    { name: "Coding" },
    { name: "Gadgets & Reviews" },
    { name: "Startups & Innovation" },
  ];

  await prisma.category.createMany({
    data: categories,
  });

  console.log("✅ New categories seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
