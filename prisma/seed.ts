import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./seeds/categories";
import { seedProducts } from "./seeds/products";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");
  await seedCategories();
  await seedProducts();
  // await seedUsers();
  console.log("🌱 Seeding finished!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
