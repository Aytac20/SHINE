import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { CollectionCarouselProps } from "@/types";
import ToggleFavorites from "../Products/ToggleFavorites";
export function CollectionCarousel({ products }: CollectionCarouselProps) {
  return (
    <section className='w-full'>
      <div>
        <hr className='text-zinc-300' />
        <h1 className='mb-4 py-6 text-center text-zinc-600 uppercase'>
          WIEDERHOEFT&apos;S COLLECTION
        </h1>
      </div>
      <div className='mx-auto max-w-[95%]'>
        <Carousel
          opts={{
            align: "center",
          }}
          className='mx-auto flex max-w-[98%] grow-0'
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className='relative flex max-w-[10rem] flex-col items-center justify-center text-center sm:max-w-[12rem] md:max-w-[16rem] lg:max-w-[18rem]'
              >
                <ToggleFavorites
                  isFavorite={product.isFavorite ?? false}
                  productId={product.id}
                />
                <Link
                  href={`/products/collection/oscar-de-la-renta/${product.id}`}
                  className='center p-4'
                >
                  <li className='list-none'>
                    {/* Image */}
                    <Image
                      height={320}
                      width={160}
                      src={product.images[0]?.url}
                      alt={product.name}
                      className='mb-4 h-full w-full object-contain'
                    />
                    {/* Name */}
                    <h2 className='mb-0.5 text-xs font-semibold tracking-wide uppercase'>
                      {product.name}
                    </h2>
                    <h3 className='mb-2 px-4 text-xs leading-5'>
                      {product.description}
                    </h3>
                    {/* Price */}
                    <p className='text-xs'>${product.price.toLocaleString()}</p>
                  </li>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls with circles */}
          <CarouselPrevious className='absolute top-1/2 left-4 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50 md:flex' />
          <CarouselNext className='absolute top-1/2 right-4 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50 md:flex' />
        </Carousel>
      </div>
    </section>
  );
}
