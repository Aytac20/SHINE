export const dynamic = "force-dynamic";

import { getUser } from "@/lib/actions/cart.actions";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
export default async function OrdersPage() {
  // Orders-i databasedən çəkirik
  const user = await getUser();
  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            include: { category: true, subCategory: true },
          },
        },
      },
      user: true,
    },
  });

  return (
    <div className='mx-auto w-full px-4 lg:w-[80%] xl:w-[70%]'>
      <h1 className='mb-4 text-2xl font-semibold'>Your Orders</h1>

      {orders.length === 0 ? (
        <p className='text-gray-500'>You don’t have any orders yet.</p>
      ) : (
        <div className='space-y-4'>
          {orders.map((order) => (
            <div key={order.id} className='border border-zinc-200'>
              {/* Order info header */}
              <div className='flex items-center justify-between bg-zinc-100 px-6 py-3 font-sans text-xs tracking-widest text-gray-600'>
                <div className='flex flex-col justify-center'>
                  <p className='font-semibold'>Order Date</p>
                  <p>{order.orderDate.toDateString()}</p>
                </div>
                <div>
                  <p>Total Amount</p>
                  <p>
                    {" "}
                    {formatPrice(
                      order.totalAmount ? Number(order.totalAmount) : 0
                    )}{" "}
                    $
                  </p>
                </div>
                <div>
                  <p>Status</p>
                  <p className='text-green-600'>{order.status}</p>
                </div>
                <Link
                  href={`/orders/${order.id}`}
                  className='rounded-md bg-zinc-800 p-2 text-white'
                >
                  Order details
                </Link>
              </div>

              {/* Order items */}
              <div className='flex flex-wrap gap-4 p-4'>
                {order?.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex w-[10rem] flex-col items-center rounded border-[1px] border-zinc-100 p-2'
                  >
                    <Link
                      href={`/products/${item.product?.category.slug}/${item.product?.subCategory?.slug}/${item.productId}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className='rounded object-cover'
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
