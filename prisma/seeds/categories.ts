import prisma from "@/lib/prisma";

export async function seedCategories() {
  // --- Main Categories ---
  const mainCategories = [
    "Clothing",
    "Shoes",
    "Bags",
    "Jewelry",
    "Collections",
  ];

  // Map: main category name -> id
  const categoriesMap: Record<string, string> = {};

  // Upsert main categories
  for (const name of mainCategories) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    categoriesMap[name] = category.id;
  }

  // --- Subcategories ---
  const subcategories: Record<string, string[]> = {
    Clothing: ["Dresses", "Shorts", "Tops", "Skirts", "Pants"],
    Shoes: ["Boots", "Sneakers", "Sandals", "Platforms", "Pumps"],
    Bags: [
      "Mini Bags",
      "Shoulder Bags",
      "Travel Bags",
      "Evening Bags",
      "Clutches",
    ],
    Jewelry: [
      "Brooches",
      "Bracelets",
      "Earrings",
      "Necklaces",
      "Cufflinks",
      "Rings",
      "Watches",
    ],
    Collections: [
      "De La Vali",
      "Arcina Ori",
      "Chloe",
      "Oscar de la Renta",
      "Alaia",
      "Khaite",
      "Wiederhoeft",
      "Jeanerica",
      "CAROLINA HERRERA",
    ],
  };

  // Upsert subcategories
  for (const [mainName, subs] of Object.entries(subcategories)) {
    const parentId = categoriesMap[mainName];
    if (!parentId) {
      console.warn(
        `⚠ Main category "${mainName}" not found. Skipping its subcategories.`
      );
      continue;
    }

    for (const sub of subs) {
      const slug = sub.toLowerCase().replace(/\s+/g, "-");

      await prisma.subCategory.upsert({
        where: { slug },
        update: {},
        create: { name: sub, slug, categoryId: parentId },
      });
    }
  }

  console.log("✅ Categories & Subcategories seeded successfully!");
}

if (require.main === module) {
  seedCategories()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
