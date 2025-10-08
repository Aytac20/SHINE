export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUser, getMyCart } from "@/lib/actions/cart.actions";

import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";


export default async function SuccessPage() {
  let orderId: string | null = null;
  let error: string | null = null;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Not authenticated");

    const user = await getUser();
    const cart = await getMyCart();
    if (!cart || cart.cartItems.length === 0) throw new Error("Cart is empty");
    if (!user.addresses || user.addresses.length === 0)
      throw new Error("No shipping address");

    const shippingAddress =
      user.addresses.find((a) => a.isDefault) || user.addresses[0];

    const insertedOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: user.id,
          addressId: shippingAddress.id,
          paymentMethod: user.paymentMethod || "CARD",
          itemsPrice: cart.itemsPrice,
          totalAmount: cart.totalPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
          status: "PENDING",
          items: {
            create: cart.cartItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.price,
              name: item.product.name,
              description: item.product.description || "",
              image: item.product.images[0]?.url || "",
              size: item.size || "",
            })),
          },
        },
      });

      for (const item of cart.cartItems) {
        await tx.productVariant.updateMany({
          where: { productId: item.product.id, size: item.size },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.update({
        where: { id: cart.id },
        data: { itemsPrice: 0, totalPrice: 0, shippingPrice: 0, taxPrice: 0 },
      });

      return order;
    });
    orderId = insertedOrder.id;
  } catch (err) {
    if (err instanceof Error) error = err.message;
    else error = "Unexpected error";
  }

  // HTML render (server-side)
  return (
    <div className='flex h-[40rem] flex-col items-center justify-center'>
      {error ? (
        <>
          <XCircle className='h-20 w-20 text-red-500' />
          <p className='mt-4 text-red-500'>{error}</p>
          <Link href='/' className='mt-4 rounded bg-gray-200 px-4 py-2'>
            Back to Home
          </Link>
        </>
      ) : (
        <>
          <CheckCircle className='h-20 w-20 text-green-600' />
          <p className='mt-4'>Order placed successfully! ID: {orderId}</p>
          <div className='mt-4 flex gap-2'>
            <Link href='/orders' className='rounded bg-green-200 px-4 py-2'>
              See Order Details
            </Link>
            <Link href='/' className='rounded bg-gray-200 px-4 py-2'>
              Back to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
