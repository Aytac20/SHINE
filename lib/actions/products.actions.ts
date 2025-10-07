export const dynamic = "force-dynamic";

import { Product, ProductImage, Category, SubCategory } from "@prisma/client";
import prisma from "../../lib/prisma";
import { PAGE_SIZE } from "../constants";

interface GetProductsOptions {
  categorySlug: string;
  subSlug?: string;
  colors?: string[];
  page?: number;
  limit?: number;
  sort?: "asc" | "desc" | null;
}
interface GetProductsResult {
  mainCategory: {
    id: string;
    name: string;
    slug: string;
    subcategories: { id: string; name: string; slug: string }[];
  } | null;
  products: ProductWithImages[];
  colors: string[];
  totalPages: number;
  error: string | null;
}

interface ProductWithImages extends Product {
  images: ProductImage[];
  category: Category;
  subCategory: SubCategory | null;
}

export async function getProducts({
  categorySlug,
  subSlug,
  colors = [],
  page = 1,
  limit = PAGE_SIZE,
  sort = null,
}: GetProductsOptions): Promise<GetProductsResult> {
  const offset = (page - 1) * limit;

  // 🔹 Find main category
  const mainCategory = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: { subcategories: true },
  });
  if (!mainCategory) {
    return {
      mainCategory: null,
      products: [],
      colors: [],
      totalPages: 0,
      error: "Category not found",
    };
  }

  // 🔹 If subSlug is given, narrow down
  let subCategoryIds: string[] = [];
  if (subSlug) {
    const subCategory = await prisma.subCategory.findFirst({
      where: { slug: subSlug, categoryId: mainCategory.id },
    });
    if (!subCategory) {
      return {
        mainCategory,
        products: [],
        colors: [],
        totalPages: 0,
        error: "Subcategory not found",
      };
    }
    subCategoryIds = [subCategory.id];
  } else {
    subCategoryIds = mainCategory.subcategories.map((s) => s.id);
  }

  // 🔹 Get all products (for filter colors)
  const allProducts = await prisma.product.findMany({
    where: { subCategoryId: { in: subCategoryIds } },
    include: { variants: true },
  });

  // 🔹 Get filtered products with pagination
  const products = await prisma.product.findMany({
    where: {
      subCategoryId: { in: subCategoryIds },
      variants:
        colors.length > 0 ? { some: { color: { in: colors } } } : undefined,
    },
    include: {
      images: true,
      category: true,
      subCategory: true,
      variants: true, // optional if you need variants
    },
    skip: offset,
    take: limit,
    orderBy: sort ? { price: sort } : undefined,
  });

  // 🔹 Unique colors
  const allColors = Array.from(
    new Set(
      allProducts.flatMap((p) =>
        p.variants.map((v) => v.color).filter((c): c is string => Boolean(c))
      )
    )
  );

  // 🔹 Total pages
  const totalProducts = await prisma.product.count({
    where: {
      subCategoryId: { in: subCategoryIds },
      variants:
        colors.length > 0 ? { some: { color: { in: colors } } } : undefined,
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    mainCategory,
    products,
    colors: allColors,
    totalPages,
    error: null,
  };
}

export async function toggleFavoriteServer(productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  return prisma.product.update({
    where: { id: productId },
    data: { isFavorite: !product.isFavorite },
  });
}
