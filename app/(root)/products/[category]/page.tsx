export const dynamic = "force-dynamic";
import Filter from "@/components/Products/Filter";
import MobileSortBy from "@/components/Products/MobileSortBy";
import Pagination from "@/components/Products/Pagination";
import ProductsList from "@/components/Products/ProductList";
import SortBy from "@/components/Products/SortBy";
import { getProducts } from "@/lib/actions/products.actions";
import { CategoryPageProps } from "@/types";

export default async function MainCategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedColors =
    resolvedSearchParams.colors?.toString().split(",") || [];
  const page = parseInt(resolvedSearchParams.page?.toString() || "1");
  const sort = (resolvedSearchParams.sort as "asc" | "desc") || null;

  const { mainCategory, products, colors, totalPages, error } =
    await getProducts({
      categorySlug: category,
      colors: selectedColors,
      page,
      sort,
    });

  if (error) return <div className='p-8'>{error}</div>;
  if (!products.length)
    return <div className='p-8'>No products in this category</div>;
  if (!mainCategory) return <div className='p-8'>Category not found</div>;

  return (
    <section className='mx-auto w-full xl:w-[85%]'>
      <div className='hidden lg:block'>
        <SortBy />
      </div>
      <div className='block lg:hidden'>
        <MobileSortBy
          mainCategory={mainCategory}
          subCategories={mainCategory.subcategories}
          colors={colors}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-[0.5fr_2fr]'>
        <aside className='relative hidden lg:block'>
          <Filter
            mainCategory={mainCategory}
            subCategories={mainCategory.subcategories}
            colors={colors}
          />
        </aside>
        <main className='flex h-screen flex-col justify-between'>
          <ProductsList products={products} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </main>
      </div>
    </section>
  );
}
