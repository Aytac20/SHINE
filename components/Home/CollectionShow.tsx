export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { CollectionCarousel } from "./Carousel";

export default async function CollectionShow() {
  const collection = await prisma.product.findMany({
    where: {
      subCategory: {
        name: "Wiederhoeft",
      },
    },
    include: {
      images: true,
    },
  });
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <CollectionCarousel products={collection} />
      <Link
        href='/products/collections/oscar-de-la-renta'
        className='inline-block rounded-full px-[3rem] py-1 text-sm text-gray-500 underline duration-300'
      >
        View More
      </Link>
    </div>
  );
}
