export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = () => {
  return (
    <div className='text-zinc-700'>
      <hr className='flex-grow border-t border-zinc-300' />
      <h1 className='py-8 text-center text-zinc-600 uppercase'>
        The latest list
      </h1>
      {/* Grid for 3 images side by side */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:px-2'>
        {/* Item 1 */}
        <Link
          href='/products/collections/wiederhoeft'
          className='group flex cursor-pointer flex-col items-center'
        >
          <div className='grid grid-cols-2 md:grid-cols-1'>
            <div className='relative w-full overflow-hidden'>
              <Image
                src='/wiederhoeft.avif'
                alt='Wiederhoeft Collection'
                width={660}
                height={800}
                quality={100}
                className='h-full w-full object-cover'
                priority
              />
            </div>
            <div className='flex flex-col justify-center p-4 text-center'>
              <span className='hidden text-[10px] font-semibold uppercase md:block'>
                TRHUNKSHOW
              </span>
              <h3 className='mt-4 px-8 text-left tracking-widest md:text-center md:text-lg'>
                Revel In Wiederhoeft&apos;s Super-Snatched Corser Gowns
              </h3>
              <span className='px-8 py-4 text-left text-[10px] font-semibold uppercase underline md:text-center'>
                shop thrunkshow
              </span>
            </div>
          </div>
        </Link>

        {/* Item 2 */}
        <Link
          href='/products/collections/jeanerica'
          className='group flex cursor-pointer flex-col items-center'
        >
          <div className='grid grid-cols-2 md:grid-cols-1'>
            <div className='relative w-full overflow-hidden'>
              <Image
                src='/jeanerica.avif'
                alt='Jeanerica Collection'
                width={660}
                height={800}
                quality={100}
                className='h-full w-full object-cover'
                priority
              />
            </div>
            <div className='flex flex-col justify-center p-4 text-center'>
              <span className='hidden text-[10px] font-semibold uppercase md:block'>
                Brand Spotlight
              </span>
              <h3 className='mt-4 px-8 text-left tracking-widest md:text-center md:text-lg'>
                Jeanerica Is The Name Behind The Season&apos;s &quot;It&quot;
                Denim
              </h3>
              <span className='px-8 py-4 text-left text-[10px] font-semibold uppercase underline md:text-center'>
                shop now
              </span>
            </div>
          </div>
        </Link>

        {/* Item 3 */}
        <Link
          href='/products/collections/carolina-herrera'
          className='group flex cursor-pointer flex-col items-center'
        >
          <div className='grid grid-cols-2 md:grid-cols-1'>
            <div className='relative w-full overflow-hidden'>
              <Image
                src='/carolina-herrera.avif'
                alt='Carolina Herrera Collection'
                width={660}
                height={800}
                quality={100}
                className='h-full w-full object-cover'
                priority
              />
            </div>
            <div className='flex flex-col justify-center p-4 text-center'>
              <span className='hidden text-[10px] font-semibold uppercase md:block'>
                TRHUNKSHOW
              </span>
              <h3 className='mt-4 px-8 text-left tracking-widest md:text-center md:text-lg'>
                Preorder Carolina Herrera&apos;s Just-Walked Ode To Madrid
              </h3>
              <span className='px-8 py-4 text-left text-[10px] font-semibold uppercase underline md:text-center'>
                shop thrunkshow
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Collections;
