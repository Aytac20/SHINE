export const dynamic = "force-dynamic";

import EmptyFavoriteList from "@/components/EmptyFavoriteList";
import Product from "@/components/Products/Product";
import prisma from "@/lib/prisma";
import React from "react";
export default async function Favorites() {
  const favoriteItem = await prisma.product.findMany({
    where: {
      isFavorite: true,
    },
    include: {
      images: true,
      category: true,
      subCategory: true,
    },
  });
  if (favoriteItem.length === 0) return <EmptyFavoriteList />;
  return (
    <div className='mx-auto h-screen w-[90%]'>
      <div className='w-full py-8'>
        <h2 className='text-center text-lg'>My Favorites</h2>
      </div>

      <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
        {favoriteItem.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
    </div>
  );
}
