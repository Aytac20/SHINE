export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export type paramsType = Promise<{ id: string }>;
export default async function OrderDetails(props: { params: paramsType }) {
  const { id } = await props.params;
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          product: {
            include: { category: true, subCategory: true },
          },
        },
      },
      address: true,
    },
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className='mx-auto mt-6 w-[90%] lg:w-[60%]'>
      <div className='flex flex-col gap-6 text-xs'>
        {order?.items.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.product?.category.slug}/${item.product?.subCategory?.slug}/${item.productId}`}
          >
            <div className='flex items-center gap-6 border-[1px] border-zinc-200 p-2'>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className='mx-2 rounded object-cover'
              />
              <div className='space-y-2.5'>
                <p>{item.name}</p>
                <p className='text-zinc-500'>{item.description}</p>
                <p className='flex gap-4 text-zinc-500'>
                  <span> Size:{item.size}</span>
                  <span> Quantity:{item.quantity}</span>
                </p>
                <p className='text-amber-600'>${item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='mt-4 flex flex-col justify-between gap-6 text-xs md:flex-row'>
        <div className='w-full border-[1px] border-zinc-200'>
          <h1 className='bg-zinc-100 px-4 py-2 font-semibold'>Address</h1>
          <div className='space-y-1 px-4 py-2'>
            <p>{order.address?.streetAddress}</p>
            <p>
              {order.address?.city}, {order.address?.country}
            </p>
            <p>{order.address?.postalCode}</p>
            <p>{order.address?.phone}</p>
          </div>
        </div>

        <div className='w-full border-[1px] border-zinc-200'>
          <h1 className='bg-zinc-100 px-4 py-2 font-semibold'>
            Payment Summary
          </h1>
          <div className='space-y-1 px-4 py-2'>
            <p className='flex w-full justify-between'>
              <span>Items price: </span>
              <span>${order.itemsPrice?.toNumber().toFixed(2)}</span>
            </p>
            <p className='flex w-full justify-between'>
              <span>Shipping price: </span>
              <span>${order.shippingPrice?.toNumber().toFixed(2)}</span>
            </p>
            <p className='flex w-full justify-between'>
              <span>Tax: </span>
              <span>${order.taxPrice?.toNumber().toFixed(2)}</span>
            </p>
            <p className='flex w-full justify-between'>
              <span>Total: </span>
              <span className='text-amber-600'>
                ${order.totalAmount?.toNumber().toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
