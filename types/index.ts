import { cartItemSchema, insertCartSchema } from "@/lib/validators";
import { Product, ProductImage, Category, SubCategory } from "@prisma/client";
import z from "zod";

// Reusable types
export interface BaseCategory {
  id: string;
  name: string;
  slug: string;
}
export type SubCategoryType = BaseCategory;

// Navbar
export type NavbarProps = {
  categories: (BaseCategory & { subcategories: SubCategoryType[] })[];
};

// Page props
export interface CategoryPageProps {
  params: Promise<{ category: string; subcategory?: string }>;
  searchParams?: Promise<{
    colors?: string | string[];
    page?: string;
    sort?: "asc" | "desc";
  }>;
}

// Product types
export interface ProductWithImages extends Product {
  images: ProductImage[];
  category: Category;
  subCategory: SubCategory | null;
}
export type ProductWithRelations = Product & {
  category: Category;
  subCategory: SubCategory;
};
export interface ProductsProps {
  products: ProductWithImages[];
}
export interface ProductProps {
  product: ProductWithImages;
}

// UI Component Props
export interface SectionNameProps {
  section: string;
}
export interface FilterProps {
  mainCategory?: BaseCategory;
  subCategories?: SubCategoryType[];
  colors?: string[];
  onClose?: () => void;
}
export interface SortByProps {
  mainCategory?: BaseCategory;
  subCategories?: SubCategoryType[];
  colors?: string[];
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  colors?: string[];
}
export type CollectionCarouselProps = {
  products: (Product & { images: ProductImage[] })[];
};
export interface SearchAreaProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof insertCartSchema>;
