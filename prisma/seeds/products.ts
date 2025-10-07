
import prisma from "@/lib/prisma";
import productsData from "./products.json";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export async function seedProducts() {
  for (const product of productsData) {
    // SubCategory-dan slug yarat
    const subCategorySlug = slugify(product.subCategory);

    const subCategory = await prisma.subCategory.findUnique({
      where: { slug: subCategorySlug },
    });

    if (!subCategory) {
      console.log(
        `SubCategory ${product.subCategory} not found, skipping product ${product.name}`
      );
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: subCategory.categoryId, // Main category
        subCategoryId: subCategory.id, // Alt kateqoriya
        images: {
          create: product.images.map((url: string) => ({ url })),
        },
        variants: {
          create: product.variants.map((v) => ({
            size: v.size ?? null, // optional
            color: v.color,
            stock: v.stock,
          })),
        },
      },
    });

    console.log(`Product ${product.name} created!`);
  }

  console.log("✅ All products seeded successfully!");
}

if (require.main === module) {
  seedProducts()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
}
