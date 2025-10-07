"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <section>
      <Carousel plugins={[autoplay.current]}>
        <CarouselContent>
          {/* Slide 1 */}
          <CarouselItem>
            <Link href='/products/collections/oscar-de-la-renta'>
              <picture>
                {/* Mobile version */}
                <source
                  srcSet='/banner1small.avif'
                  media='(max-width: 768px)'
                />
                {/* Desktop version */}
                <Image
                  src='/banner1.avif'
                  alt='Banner 1'
                  width={2000}
                  height={833}
                  priority
                  className='h-full w-full object-cover'
                  quality={100}
                />
              </picture>
            </Link>
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem>
            <Link href='/products/collections/khaite'>
              <picture>
                <source
                  srcSet='/banner2small.avif'
                  media='(max-width: 768px)'
                />
                <Image
                  src='/banner2.avif'
                  alt='Banner 2'
                  width={2000}
                  height={833}
                  className='h-full w-full object-cover'
                  quality={100}
                />
              </picture>
            </Link>
          </CarouselItem>

          {/* Slide 3 */}
          <CarouselItem>
            <Link href='/products/collections/alaia'>
              <picture>
                <source
                  srcSet='/banner3small.avif'
                  media='(max-width: 768px)'
                />
                <Image
                  src='/banner3.avif'
                  alt='Banner 3'
                  width={2000}
                  height={833}
                  className='h-full w-full object-cover'
                  quality={100}
                />
              </picture>
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50' />
        <CarouselNext className='absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50' />
      </Carousel>
    </section>
  );
};

export default Banner;
